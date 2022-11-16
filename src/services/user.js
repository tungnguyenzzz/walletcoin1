import db from '../models'


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
export const getOne = (userId) => new Promise(async (resolve, reject) => {

    try {
        const user = await db.User.findOne(
            {
                where: { id: userId },
                attributes: {
                    exclude: ['password', 'role', 'refresh_token', 'kyc_id', 'wallet_id']
                }
            }
        )
        const wallet = await db.Wallet.findOne({
            where: { id: 12 }
        })

        if (user && wallet)
            resolve({
                success: true,
                mes: 'got',
                data: {
                    user,
                    wallet_code: wallet.wallet_code
                }

            })
        else {
            resolve({
                success: false,
                mes: 'khong tim thay thong tin',
                data: []
            })
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