import { parse } from 'dotenv';
import db from '../models'

export const posttransfer = (transfer_wallet_code, take_wallet_code, total_coin, total_coin_referral) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Wallet.findOne({ where: { wallet_code: transfer_wallet_code } });
        const responsetake = await db.Wallet.findOne({ where: { wallet_code: take_wallet_code } });
        if (total_coin > 0) {
            if (response.total_coin < total_coin) {
                resolve({
                    success: false,
                    err: response || responsetake,
                    mes: 'Your remaining coins are not enough to make this transaction!',
                    data: []
                })

            } else {
                let totalCoin = parseFloat(responsetake.total_coin) + parseFloat(total_coin)
                const createdtranfer = await db.Wallet.update({
                    total_coin: totalCoin
                }, {
                    where: {
                        wallet_code: take_wallet_code
                    }
                });

                if (createdtranfer) {
                    let totalCoin = parseFloat(response.total_coin) - parseFloat(total_coin);
                    const createdtranfer1 = await db.Wallet.update({
                        total_coin: totalCoin
                    }, {
                        where: {
                            wallet_code: transfer_wallet_code
                        }
                    });

                    if (createdtranfer1) {
                        const history = await db.History_transfer.create({
                            transfer_wallet_code: transfer_wallet_code,
                            take_wallet_code: take_wallet_code,
                            total_coin: total_coin,
                            total_coin_referral: "0"
                        });

                        if (history) {
                            resolve({
                                success: true,
                                err: [],
                                mes: 'successful transfer!!',
                                data: history
                            })
                        } else {
                            resolve({
                                success: false,
                                err: [],
                                mes: 'transaction history cannot be saved',
                                data: []
                            })
                        }

                    } else {
                        resolve({
                            success: false,
                            err: [],
                            mes: 'error cannot get the sender wallet code',
                            data: [],
                        })
                    }
                } else {
                    resolve({
                        success: false,
                        err: createdtranfer,
                        mes: 'error cant get wallet code',
                        data: [],
                    })
                }
            }

        } else {
            if (response.total_coin_referral < total_coin_referral) {
                resolve({
                    success: false,
                    err: response || responsetake,
                    mes: 'Your remaining coins are not enough to make this transaction!',
                    data: []
                })
            } else {
                let totalCoin_referral = parseFloat(responsetake.total_coin_referral) + parseFloat(total_coin_referral)
                const createdtranfer = await db.Wallet.update({
                    total_coin_referral: totalCoin_referral
                }, {
                    where: {
                        wallet_code: take_wallet_code
                    }
                });

                if (createdtranfer) {
                    let totalCoin_referral = parseFloat(response.total_coin_referral) - parseFloat(total_coin_referral);
                    const createdtranfer1 = await db.Wallet.update({
                        total_coin_referral: totalCoin_referral
                    }, {
                        where: {
                            wallet_code: transfer_wallet_code
                        }
                    });

                    if (createdtranfer1) {
                        const history = await db.History_transfer.create({
                            transfer_wallet_code: transfer_wallet_code,
                            take_wallet_code: take_wallet_code,
                            total_coin: "0",
                            total_coin_referral: total_coin_referral
                        });

                        if (history === true) {
                            resolve({
                                success: true,
                                err: history,
                                mes: 'successful transfer!!',
                                data: history
                            })
                        } else {
                            resolve({
                                success: false,
                                err: history,
                                mes: 'transaction history cannot be saved',
                                data: []
                            })
                        }

                    } else {
                        resolve({
                            success: false,
                            err: createdtranfer1,
                            mes: 'error cannot get the sender wallet code',
                            data: []
                        })
                    }
                } else {
                    resolve({
                        success: false,
                        err: createdtranfer,
                        mes: 'error cant get wallet code',
                        data: []
                    })
                }
            }
        }

        resolve({
            success: false,
            err: response,
            mes: 'not success',
            data: []
        })
    } catch (error) {
        reject(error)
    }
})

export const gethistorytranfer = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.History_transfer.findAll({ 
            limit: 100, 
            order: [
                ['id', 'DESC'] 
            ]
        });

        resolve({
            success: true,
            err: 'success',
            mes: 'success',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

export const gettopwallet = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Wallet.findAll({ 
            limit: 100, 
            order: [
                ['total_coin', 'DESC'] 
            ]
        });

        resolve({
            success: true,
            err: 'success',
            mes: 'success',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

export const getwallet = (transfer_wallet_code) => new Promise(async (resolve, reject) => {
    try {
        
        const response = await db.History_transfer.findAll({ 
            limit: 100,             
            where: {
                transfer_wallet_code: transfer_wallet_code,
            },
            order: [
                ['id', 'DESC'] 
            ]
        });

        resolve({
            success: true,
            err: 'success',
            mes: 'success',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})