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
            mes: 'missing parameters',
            data: []
        })
    }

    if (!codeReferInput || codeReferInput === '') {

        const coin_code_NTC = randomCoinCode()
        const coin_code_NCO = randomCoinCode()
        const coin_code_NUSD = randomCoinCode()
        const wallet = await db.Wallet.create({
            id: v4(),
            coin_code_NTC: coin_code_NTC,    //sinh ma coin 34 ky tu
            coin_code_NCO: coin_code_NCO,
            coin_code_NUSD: coin_code_NUSD

        })

        const kyc = await db.Kyc.create({//them kyc id
            status: 0
        })

        try {
            const response = await db.User.findOrCreate({ // email exist tra ve false
                where: { email },
                defaults: {
                    id: v4(),
                    email,
                    password: hashPassword(password),
                    codeRefer: uuidv4(),
                    kyc_id: kyc.id,
                    wallet_id: wallet.id
                }
            })

            const accessToken = response[1] // khong thi tra ve true
                ? jwt.sign({ id: response[0].id, email: response[0].email, role_code: response[0].role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })
                : null

            // JWT_SECRET_REFRESH_TOKEN
            const refreshToken = response[1]
                ? jwt.sign({ id: response[0].id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })
                : null
            if (refreshToken) {
                await db.User.update({
                    refresh_token: refreshToken
                }, {
                    where: { id: response[0].id }
                })
            }
            // if (accessToken) {  // gui email
            //     const url = `${process.env.CLIENT_URL}users/${response[0].id}/verify/${accessToken}`;
            //     await sendEmail(response[0].email, "Verify Email", url);
            // }
            resolve({
                err: response[1] ? 0 : 1,
                mes: response[1] ? 'Register is successfully' : 'Email is used',
                access_token: accessToken ? `Bearer ${accessToken}` : accessToken,
                refresh_token: refreshToken,
                statusMail: "An Email sent to your account please verify"
            })

        } catch (error) {
            reject(error)
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
            mes: 'coderefer not found',
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
            const wallet = await db.Wallet.create({
                id: v4(),
                coin_code_NTC: coin_code_NTC,    //sinh ma coin 34 ky tu
                coin_code_NCO: coin_code_NCO,
                coin_code_NUSD: coin_code_NUSD,
                total_coin_NCO: 1

            })

            const kyc = await db.Kyc.create({
                status: 0

            })

            try {
                const response = await db.User.findOrCreate({ // email exist tra ve false
                    where: { email },
                    defaults: {
                        id: v4(),
                        email,
                        password: hashPassword(password),
                        codeRefer: uuidv4(),
                        kyc_id: kyc.id,
                        wallet_id: wallet.id
                    }
                })

                const accessToken = response[1] // khong thi tra ve true
                    ? jwt.sign({ id: response[0].id, email: response[0].email, role_code: response[0].role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })
                    : null

                // JWT_SECRET_REFRESH_TOKEN
                const refreshToken = response[1]
                    ? jwt.sign({ id: response[0].id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })
                    : null
                if (refreshToken) {
                    await db.User.update({
                        refresh_token: refreshToken
                    }, {
                        where: { id: response[0].id }
                    })
                }
                if (accessToken) {  // gui email
                    const url = `${process.env.CLIENT_URL}users/${response[0].id}/verify/${accessToken}`;
                    await sendEmail(response[0].email, "Verify Email", url);
                }
                resolve({
                    err: response[1] ? 0 : 1,
                    mes: response[1] ? 'Register is successfully' : 'Email is used',
                    access_token: accessToken ? `Bearer ${accessToken}` : accessToken,
                    refresh_token: refreshToken,
                    statusMail: "An Email sent to your account please verify"
                })

            } catch (error) {
                reject(error)
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
            const accessToken = isChecked
                ? jwt.sign({ id: response.id, email: response.email, role_code: response.role_code }, process.env.JWT_SECRET, { expiresIn: '99999s' })
                : null
            // JWT_SECRET_REFRESH_TOKEN
            const refreshToken = isChecked
                ? jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d' })
                : null
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
                mes: 'Login is successfully',
                data: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    userId: response.id
                }
            })
        } else {
            resolve({
                success: false,
                err: [],
                mes: 'Email and password incorrect!',
                data: []
            })
        }
    } catch (error) {
        console.log(error)
        reject({
            success: false,
            err: error,
            mes: 'Email and password incorrect!',
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
                        err: 1,
                        mes: 'Refresh token expired. Require login'
                    })
                }
                else {
                    const accessToken = jwt.sign({ id: response.id, email: response.email, role_code: response.role_code }, process.env.JWT_SECRET, { expiresIn: '2d' })
                    resolve({
                        err: accessToken ? 0 : 1,
                        mes: accessToken ? 'OK' : 'Fail to generate new access token. Let try more time',
                        'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
                        'refresh_token': refresh_token
                    })
                }
            })
        }
    } catch (error) {
        reject(error)
    }
})