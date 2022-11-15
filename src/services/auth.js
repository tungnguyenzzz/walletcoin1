import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()
import { v4 as uuidv4 } from 'uuid';



const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

export const register = ({ email, password }) => new Promise(async (resolve, reject) => {
    let result = '';
    let characters = process.env.WALLET_CODE;
    let charactersLength = characters.length;
    for (let i = 0; i < 34; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // try {
    const wallet = await db.Wallet.create({
        wallet_code: result

    })
    // } catch (error) {
    //     reject(error)
    // }
    // try {
    const kyc = await db.Kyc.create({
        status: 0

    })
    // } catch (error) {
    //     reject(error)
    // }
    try {
        const response = await db.User.findOrCreate({ // email exist tra ve false
            where: { email },
            defaults: {
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
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Register is successfully' : 'Email is used',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
            'refresh_token': refreshToken
        })
        if (refreshToken) {
            await db.User.update({
                refresh_token: refreshToken
            }, {
                where: { id: response[0].id }
            })
        }
    } catch (error) {
        reject(error)
    }
})
export const login = ({ email, password }) => new Promise(async (resolve, reject) => {

    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password);
        console.log('response', response );
        
        if(response && isChecked) {
                const accessToken = isChecked
                ? jwt.sign({ id: response.id, email: response.email, role_code: response.role_code }, process.env.JWT_SECRET, { expiresIn: '5s' })
                : null
                // JWT_SECRET_REFRESH_TOKEN
                const refreshToken = isChecked
                ? jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '60s' })
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
                           refresh_token: refreshToken 
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