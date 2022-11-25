import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()
import { v4 as uuidv4, v4 } from 'uuid';
const sendEmail = require("../config/sendEmail");


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))
const randomCoinCode = () => {
    let result = '';
    let characters = process.env.WALLET_CODE;
    let charactersLength = characters.length;
    for (let i = 0; i < 34; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

export const register = ({ email, password, codeReferInput }) => new Promise(async (resolve, reject) => {
    if (!email || !password) {
        resolve({
            success: false,
            err: [],
            mes: 'Missing parameters',
            data: []
        })
    }

    if (!codeReferInput || codeReferInput === '') {

        const coin_code_NTC = randomCoinCode()
        const coin_code_NCO = randomCoinCode()
        const coin_code_NUSD = randomCoinCode()


        try {
            const response = await db.User.findOrCreate({ // email exist tra ve false
                where: { email },
                defaults: {
                    id: v4(),
                    email,
                    code_verify: v4(),
                    password: hashPassword(password),
                    codeRefer: uuidv4(),
                    kyc_id: v4(),
                    wallet_id: v4()
                }
            })

            if (response[1]) { //response[1] === true thi moi sign false la tim thay email trong db
                await db.Wallet.create({
                    id: response[0].wallet_id,
                    coin_code_NTC: coin_code_NTC,    //sinh ma coin 34 ky tu
                    coin_code_NCO: coin_code_NCO,
                    coin_code_NUSD: coin_code_NUSD,
                    total_coin_NUSD: 110


                })
                await db.Kyc.create({//them kyc id
                    id: response[0].kyc_id,
                    status: 0
                })

                const accessToken = jwt.sign({ id: response[0].id, email: response[0].email, role_code: response[0].role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })


                // JWT_SECRET_REFRESH_TOKEN
                const refreshToken = jwt.sign({ id: response[0].id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })

                if (refreshToken) {
                    await db.User.update({
                        refresh_token: refreshToken
                    }, {
                        where: { id: response[0].id }
                    })
                    // const url = `${process.env.CLIENT_URL}users/${response[0].id}/verify/${response[0].code_verify}`;// gui email
                    // await sendEmail(response[0].email, "Verify Email", url);
                }

                resolve({
                    success: true,
                    mes: 'Register successfully',
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    userId: response[0].id,
                    statusMail: "An Email sent to your account please verify"
                })
            } else {
                resolve({
                    success: false,
                    mes: 'Email used, Sign In',
                })
            }

        } catch (error) {
            resolve(error)
        }
    } else {
        //tim thang user co ma gioi thieu nhap vao
        const findWallet = await db.User.findOne(
            { where: { codeRefer: codeReferInput } }
        )
        //khong tim thay resolve loi va dang ky lai
        if (!findWallet) resolve({
            success: false,
            err: [],
            mes: 'Code referral not found',
            data: []
        })
        else {
            const findTotalCoinReferal = await db.Wallet.findOne({ //tim vi cua thang gioi thieu
                where: {
                    id: findWallet.wallet_id
                }
            })

            await db.Wallet.update({
                total_coin_NCO: findTotalCoinReferal.total_coin_NCO + 3.0 // cong them 3$
            },
                {
                    where: { id: findWallet.wallet_id }
                }
            )
            const coin_code_NTC = randomCoinCode()
            const coin_code_NCO = randomCoinCode()
            const coin_code_NUSD = randomCoinCode()




            try {
                const response = await db.User.findOrCreate({ // email exist tra ve false
                    where: { email },
                    defaults: {
                        id: v4(),
                        email,
                        code_verify: v4(),
                        password: hashPassword(password),
                        codeRefer: uuidv4(),
                        kyc_id: v4(),
                        wallet_id: v4(),
                    }
                })
                if (response[1]) {
                    await db.Wallet.create({
                        id: response[0].wallet_id,
                        coin_code_NTC: coin_code_NTC,    //sinh ma coin 34 ky tu
                        coin_code_NCO: coin_code_NCO,
                        coin_code_NUSD: coin_code_NUSD,
                        total_coin_NCO: 1,
                        total_coin_NUSD: 110


                    })
                    await db.User.update({ entered: false }, { where: { id: response[0].id } }) // set truong da nhap code refer thanh false: nhap 1 lan thoi
                    await db.Kyc.create({//them kyc id
                        id: response[0].kyc_id,
                        status: 0
                    })
                    const accessToken = jwt.sign({ id: response[0].id, email: response[0].email, role_code: response[0].role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })


                    // JWT_SECRET_REFRESH_TOKEN
                    const refreshToken = jwt.sign({ id: response[0].id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })

                    if (refreshToken) {
                        await db.User.update({
                            refresh_token: refreshToken
                        }, {
                            where: { id: response[0].id }
                        })
                        // const url = `${process.env.CLIENT_URL}users/${response[0].id}/verify/${response[0].code_verify}`;// gui email
                        // await sendEmail(response[0].email, "Verify Email", url);
                    }

                    resolve({
                        success: true,
                        mes: 'Register successfully',
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        userId: response[0].id,
                        statusMail: "An Email sent to your account please verify"
                    })
                } else {
                    resolve({
                        success: false,
                        mes: 'Email used, Sign In',
                    })
                }



            } catch (error) {
                resolve(error)
            }
        }



    }

})
export const login = ({ email, password }) => new Promise(async (resolve, reject) => {

    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password);

        if (response && isChecked) {
            if (!response.verify) {
                const accessToken = jwt.sign({ id: response.id, email: response.email, role_code: response.role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })

                // JWT_SECRET_REFRESH_TOKEN
                const refreshToken = jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })
                if (refreshToken) {
                    await db.User.update({
                        refresh_token: refreshToken
                    }, {
                        where: { id: response.id }
                    })
                    const url = `${process.env.CLIENT_URL}users/${response.id}/verify/${response.code_verify}`;// gui email
                    await sendEmail(response.email, "Verify Email", url);
                }
                resolve({
                    success: false,
                    err: [],
                    mes: 'An Email sent to your account please verify before login',
                    data: []
                })
            }
            else {
                const accessToken = jwt.sign({ id: response.id, email: response.email, role_code: response.role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })

                // JWT_SECRET_REFRESH_TOKEN
                const refreshToken = jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })

                if (refreshToken) {
                    await db.User.update({
                        refresh_token: refreshToken
                    }, {
                        where: { id: response.id }
                    })
                }
                resolve({
                    success: true,
                    err: [],
                    mes: 'Login successfully',
                    data: {
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        userId: response.id
                    }
                })
            }

        } else {
            resolve({
                success: false,
                err: [],
                mes: 'Email or password incorrect!',
                data: []
            })
        }
    } catch (error) {
        resolve({
            success: false,
            err: error,
            mes: 'Email or password incorrect!',
            data: []
        })
    }
})
export const loginGoogle = ({ email, sub }) => new Promise(async (resolve, reject) => {

    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(sub, response.password);

        if (response && isChecked) {
            if (!response.verify) {
                const accessToken = jwt.sign({ id: response.id, email: response.email }, process.env.JWT_SECRET, { expiresIn: '99999s' })

                // JWT_SECRET_REFRESH_TOKEN
                const refreshToken = jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })
                if (refreshToken) {
                    await db.User.update({
                        refresh_token: refreshToken
                    }, {
                        where: { id: response.id }
                    })
                    const url = `${process.env.CLIENT_URL}users/${response.id}/verify/${response.code_verify}`;// gui email
                    await sendEmail(response.email, "Verify Email", url);
                }
                resolve({
                    success: false,
                    err: [],
                    mes: 'An Email sent to your account please verify before login',
                    data: []
                })
            }
            else {
                const accessToken = jwt.sign({ id: response.id, email: response.email }, process.env.JWT_SECRET, { expiresIn: '99999s' })

                // JWT_SECRET_REFRESH_TOKEN
                const refreshToken = jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })

                if (refreshToken) {
                    await db.User.update({
                        refresh_token: refreshToken
                    }, {
                        where: { id: response.id }
                    })
                }
                resolve({
                    success: true,
                    err: [],
                    mes: 'Login successfully',
                    data: {
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        userId: response.id
                    }
                })
            }

        } else {
            resolve({
                success: false,
                err: [],
                mes: 'Email or password incorrect!',
                data: []
            })
        }
    } catch (error) {
        resolve({
            success: false,
            err: error,
            mes: 'Email not found or not registered',
            data: []
        })
    }
})

export const refreshToken = (refresh_token) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { refresh_token }
        })
        if (response) {
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err) => {
                if (err) {
                    resolve({
                        success: false,
                        mes: 'Refresh token expired. Require login'
                    })
                }
                else {
                    const accessToken = jwt.sign({ id: response.id, email: response.email, role_code: response.role_code }, process.env.JWT_SECRET, { expiresIn: '2d' })
                    resolve({
                        success: accessToken ? true : false,
                        mes: accessToken ? 'OK' : 'Fail to generate new access token. Let try more time',
                        access_token: accessToken ? `Bearer ${accessToken}` : accessToken,
                        refresh_token: refresh_token
                    })
                }
            })
        }
    } catch (error) {
        resolve(error)
    }
})


export const registerWithGoogle = ({ email, sub }) => new Promise(async (resolve, reject) => {
    if (!email || !sub) {
        resolve({
            success: false,
            err: [],
            mes: 'Missing parameters',
            data: []
        })
    }

    const coin_code_NTC = randomCoinCode()
    const coin_code_NCO = randomCoinCode()
    const coin_code_NUSD = randomCoinCode()


    try {
        const response = await db.User.findOrCreate({ // email exist tra ve false
            where: { email },
            defaults: {
                id: v4(),
                email,
                code_verify: v4(),
                password: hashPassword(sub),
                codeRefer: uuidv4(),
                kyc_id: v4(),
                wallet_id: v4(),
                role_login: 1
            }
        })

        if (response[1]) { //response[1] === true thi moi sign false la tim thay email trong db
            await db.Wallet.create({
                id: response[0].wallet_id,
                coin_code_NTC: coin_code_NTC,    //sinh ma coin 34 ky tu
                coin_code_NCO: coin_code_NCO,
                coin_code_NUSD: coin_code_NUSD,
                total_coin_NUSD: 110


            })
            await db.Kyc.create({//them kyc id
                id: response[0].kyc_id,
                status: 0
            })

            const accessToken = jwt.sign({ id: response[0].id, email: response[0].email, role_code: response[0].role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })


            // JWT_SECRET_REFRESH_TOKEN
            const refreshToken = jwt.sign({ id: response[0].id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })

            if (refreshToken) {
                await db.User.update({
                    refresh_token: refreshToken
                }, {
                    where: { id: response[0].id }
                })
                // const url = `${process.env.CLIENT_URL}users/${response[0].id}/verify/${response[0].code_verify}`;// gui email
                // await sendEmail(response[0].email, "Verify Email", url);
            }

            resolve({
                success: true,
                mes: 'Register successfully',
                access_token: accessToken,
                refresh_token: refreshToken,
                userId: response[0].id,
                statusMail: "An Email sent to your account please verify"
            })
        } else {
            resolve({
                success: false,
                mes: 'Email used, Sign In',
            })
        }
    } catch (error) {
        resolve(error)
    }

})