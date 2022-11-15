import db from '../models'


export const postminingcoin = ( user_id, time_start, time_over, status, total_coin ) => new Promise(async (resolve, reject) => {
    try {

        
        const wallet_id = await db.User.findOne({ where: { id: user_id } });
   
        console.log( wallet_id.wallet_id )        
        const Mining_coin = await db.Mining_coin.findOne({ where: { wallet_id: wallet_id.wallet_id } });
        
        if (Mining_coin === null){
            const response = await db.Mining_coin.create({
                time_start: time_start,
                time_over: time_over,
                status: status,
                total_coin: "10",
                wallet_id: wallet_id.wallet_id
            });

            resolve({
                err: response ? 0 : 1,
                mes: "create success",
                kycData: response
            })
        } else {
            const response = await db.Mining_coin.update({
                time_start: time_start,
                time_over: time_over,
                status: status,
                total_coin: "10",
            }, {
                where: {
                    wallet_id: wallet_id.wallet_id
                }
            });

            resolve({
                err: response ? 0 : 1,
                mes: "update success",
                kycData: response
            })
        }


    } catch (error) {
        reject(error)
    }
})