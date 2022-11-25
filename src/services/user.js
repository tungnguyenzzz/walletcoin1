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
                        kyc: kycStatus
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
                mes: 'khong tim thay user',
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
            success: false,
            message: "Invalid link"
        });
        if (user.verify) {
            resolve({
                success: true,
                message: 'Verified email'
            })
        } else {
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
        }

    } catch (error) {
        reject(error)
    }
})
export const typeCodeReferral = (user_id, codeReferInput) => new Promise(async (resolve, reject) => {


    if (!codeReferInput || codeReferInput === '' || !user_id || user_id === '') {
        resolve({
            success: false,
            mes: "Missing codeRefer or UserId"
        })
    }
    try {
        const userRefer = await db.User.findOne({ where: { codeRefer: codeReferInput } });// tim thang gioi thieu
        const user = await db.User.findOne({ where: { id: user_id } })// tim thang nhap code
        if (!userRefer || !user) {
            resolve({
                success: false,
                mes: "Code referral or User not found"
            })
        } else {
            if (user.entered === false) {
                resolve({//check xem da nhap code lan nao chua
                    success: false,
                    mes: 'you have already entered'
                })
            } else {
                const walletRefer_old = await db.Wallet.findOne({ where: { id: userRefer.wallet_id } })// tim vi cua thang gioi thieu
                const walletRefer = await db.Wallet.findOne({ where: { id: user.wallet_id } }) // tim vi cua thang nhap code
                await db.Wallet.update({ total_coin_NCO: walletRefer_old.total_coin_NCO + 3.000 }, // cong them 3$ cho thang gioi thieu
                    {
                        where: { id: userRefer.wallet_id }
                    }
                )
                await db.Wallet.update({ total_coin_NCO: walletRefer.total_coin_NCO + 1.000 }, // cong them 3$ cho thang gioi thieu va set entered = false
                    {
                        where: { id: user.wallet_id }
                    }
                )
                await db.User.update({ entered: false }, // cong them 3$ cho thang gioi thieu va set entered = false
                    {
                        where: { id: user_id }
                    }
                )
                resolve({
                    success: true,
                    mes: 'Got 1$'
                })
            }
            //chua thi moi cong tien

        }


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