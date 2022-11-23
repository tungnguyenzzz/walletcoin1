import db from '../models'
import jwt from 'jsonwebtoken'
// export const getOne = (userId) => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.User.findOne({
//             where: { id: userId },
//             attributes: {
//                 exclude: ['password', 'role_code', 'refresh_token']
//             },
//             include: [
//                 { model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] }
//             ]
//         })
//         resolve({
//             err: response ? 0 : 1,
//             mes: response ? 'Got' : 'User not found',
//             userData: response
//         })
//     } catch (error) {
//         reject(error)
//     }
// })
export const getOne = (id) => new Promise(async (resolve, reject) => {

    try {
        const user = await db.User.findOne(
            {
                where: { id: id },
                attributes: {
                    exclude: ['password', 'role', 'refresh_token'] //, 'kyc_id', 'wallet_id'
                }
            }
        )
        if (user) {
            const wallet = await db.Wallet.findOne({
                where: { id: user.wallet_id }
            })
            const kycStatus = await db.Kyc.findOne({
                where: { id: user.kyc_id }
            })
            console.log(wallet.coin_code_NTC, kycStatus.status)

            if (user && wallet)
                resolve({
                    success: true,
                    mes: 'got',
                    data: {
                        user,
                        wallet,
                        kycStatus: kycStatus.status
                    }

                })
            else {
                resolve({
                    success: false,
                    mes: 'khong tim thay thong tin',
                    data: []
                })
            }
        } else {
            resolve({
                success: false,
                mes: 'khong tim thay email',
                data: []
            })
        }

    } catch (error) {
        reject(error)
    }
})
export const verifyEmail = (id, code_verify) => new Promise(async (resolve, reject) => {

    try {
        const user = await db.User.findOne({ where: { id: id, code_verify: code_verify } });
        if (!user) resolve({
            message: "Invalid link"
        });
        await db.User.update({ verify: true }, {
            where: {
                id: user.id
            }
        })
        resolve({
            success: true,
            mes: 'Email verified successfully',
            data: []
        })
    } catch (error) {
        reject(error)
    }
})
export const typeCodeReferral = (codeReferInput) => new Promise(async (resolve, reject) => {

    if (!codeReferInput || codeReferInput === '') {
        resolve({
            success: false,
            mes: "Missing codeRefer"
        })
    }
    try {
        const user = await db.User.findOne({ where: { codeRefer: codeReferInput } });
        if (!user) resolve({
            success: false,
            message: "Code referral not found"
        });
        const wallet_old = db.Wallet.findOne({ where: { id: user.wallet_id } })
        const wallet = await db.Wallet.update({ total_coin_NCO: wallet_old.total_coin_NCO + 3.000 },
            {
                where: { id: user.wallet_id }
            }
        )

        // await db.User.update({ verify: true }, {
        //     where: {
        //         id: user.id
        //     }
        // })
        // resolve({
        //     success: true,
        //     mes: 'Email verified successfully',
        //     data: []
        // })
    } catch (error) {
        reject(error)
    }
})



// const findWallet = await db.User.findOne(
//     { where: { codeRefer: codeReferInput } }
// )

// await db.Wallet.update({
//     total_coin: total_coin + 5
// }