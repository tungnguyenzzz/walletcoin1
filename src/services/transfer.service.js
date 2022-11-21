import { parse } from 'dotenv';
import db from '../models'

export const posttransfer = (user_id, transfer_wallet_code, take_wallet_code, total_coin_NTC, total_coin_NCO, total_coin_NUSD) => new Promise(async (resolve, reject) => {
    try {

        const kyc = await db.User.findOne({ where: { id: user_id } });
        const checkkyc = await db.Kyc.findOne({ where: { id: kyc.kyc_id } });

        if (total_coin_NTC <= 0 || total_coin_NCO <= 0) {
            resolve({
                success: false,
                err: 'khong duoc truyen so am vao day',
                mes: 'not',
                data: []
            })
        } else {

            if (total_coin_NUSD > 0) {
                const response = await db.Wallet.findOne({ where: { coin_code_NUSD: transfer_wallet_code } });
                const responsetake = await db.Wallet.findOne({ where: { coin_code_NUSD: take_wallet_code } });
                console.log(response.total_coin_NUSD);
                if (response.total_coin_NUSD < total_coin_NUSD) {
                    resolve({
                        success: false,
                        err: response || responsetake,
                        mes: 'Your remaining coins are not enough to make this transaction!',
                        data: []
                    })
                } else {
                    let total_coin_NUSDD = parseFloat(responsetake.total_coin_NUSD) + parseFloat(total_coin_NUSD)
                    const createdtranfer = await db.Wallet.update({
                        total_coin_NUSD: total_coin_NUSDD
                    }, {
                        where: {
                            coin_code_NUSD: take_wallet_code
                        }
                    });

                    if (createdtranfer) {
                        let total_coin_NUSDC = parseFloat(response.total_coin_NUSD) - parseFloat(total_coin_NUSD);
                        const createdtranfer1 = await db.Wallet.update({
                            total_coin_NUSD: total_coin_NUSDC
                        }, {
                            where: {
                                coin_code_NUSD: transfer_wallet_code
                            }
                        });

                        if (createdtranfer1) {
                            const history = await db.History_transfer.create({
                                transfer_wallet_code: transfer_wallet_code,
                                take_wallet_code: take_wallet_code,
                                total_coin_NTC: 0,
                                total_coin_NCO: 0,
                                total_coin_NUSD: total_coin_NUSD
                            });

                            if (history) {
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

            if (checkkyc.status === 0) {
                resolve({
                    success: false,
                    err: 'chua kyc',
                    mes: 'error kyc',
                    data: []
                })
            } else {
                if (total_coin_NTC > 0) {
                    const response = await db.Wallet.findOne({ where: { coin_code_NTC: transfer_wallet_code } });
                    const responsetake = await db.Wallet.findOne({ where: { coin_code_NTC: take_wallet_code } });
                    if (response.total_coin_NTC < total_coin_NTC) {
                        resolve({
                            success: false,
                            err: response || responsetake,
                            mes: 'Your remaining coins are not enough to make this transaction!',
                            data: []
                        })

                    } else {
                        let total_coin_NTCC = parseFloat(responsetake.total_coin_NTC) + parseFloat(total_coin_NTC)
                        const createdtranfer = await db.Wallet.update({
                            total_coin_NTC: total_coin_NTCC
                        }, {
                            where: {
                                coin_code_NTC: take_wallet_code
                            }
                        });

                        if (createdtranfer) {
                            let total_coin_NT = parseFloat(response.total_coin_NTC) - parseFloat(total_coin_NTC);
                            const createdtranfer1 = await db.Wallet.update({
                                total_coin_NTC: total_coin_NT
                            }, {
                                where: {
                                    coin_code_NTC: transfer_wallet_code
                                }
                            });

                            if (createdtranfer1) {
                                const history = await db.History_transfer.create({
                                    transfer_wallet_code: transfer_wallet_code,
                                    take_wallet_code: take_wallet_code,
                                    total_coin_NTC: total_coin_NTC,
                                    total_coin_NCO: 0,
                                    total_coin_NUSD: 0
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

                } else if (total_coin_NCO > 0) {
                    const response = await db.Wallet.findOne({ where: { coin_code_NCO: transfer_wallet_code } });
                    const responsetake = await db.Wallet.findOne({ where: { coin_code_NCO: take_wallet_code } });
                    console.log(response.total_coin_NCO);
                    if (response.total_coin_NCO < total_coin_NCO) {
                        resolve({
                            success: false,
                            err: response || responsetake,
                            mes: 'Your remaining coins are not enough to make this transaction!',
                            data: []
                        })
                    } else {
                        let total_coin_NCOO = parseFloat(responsetake.total_coin_NCO) + parseFloat(total_coin_NCO)
                        const createdtranfer = await db.Wallet.update({
                            total_coin_NCO: total_coin_NCOO
                        }, {
                            where: {
                                coin_code_NCO: take_wallet_code
                            }
                        });

                        if (createdtranfer) {
                            let total_coin_NCOC = parseFloat(response.total_coin_NCO) - parseFloat(total_coin_NCO);
                            const createdtranfer1 = await db.Wallet.update({
                                total_coin_NCO: total_coin_NCOC
                            }, {
                                where: {
                                    coin_code_NCO: transfer_wallet_code
                                }
                            });

                            if (createdtranfer1) {
                                const history = await db.History_transfer.create({
                                    transfer_wallet_code: transfer_wallet_code,
                                    take_wallet_code: take_wallet_code,
                                    total_coin_NTC: 0,
                                    total_coin_NCO: total_coin_NCO,
                                    total_coin_NUSD: 0
                                });

                                if (history) {
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
            }
        }

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


export const gettopwalletNTC = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Wallet.findAll({
            limit: 100,
            order: [
                ['total_coin_NTC', 'DESC']
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


export const gettopwalletNCO = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Wallet.findAll({
            limit: 100,
            order: [
                ['total_coin_NCO', 'DESC']
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


export const gettopwalletNUSD = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Wallet.findAll({
            limit: 100,
            order: [
                ['total_coin_NUSD', 'DESC']
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


export const gettotaltransfer = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.History_transfer.findOne({
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

export const gettotalcoin = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Kyc.findAll({
            where: {
                status: 1,
            },
        });

        console.log(response[0].id);

        if (response) {
            const userKyc = await db.User.findAll({
                include: [{
                    model: Wallet,
                    where: { kyc_id: response[0].id }
                }]
            })
            console.log(userKyc)
        } else {
            resolve({
                success: false,
                err: 'error find all kyc',
                mes: 'error',
                data: userKyc
            })
        }


    } catch (error) {
        reject(error)
    }
})