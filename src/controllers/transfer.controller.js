import * as services from "../services"

export const postTransfer = async (req, res) => {

    try {
        const { transfer_wallet_code, take_wallet_code, total_coin_NTC, total_coin_NCO } = req.body;
        const response = await services.posttransfer(transfer_wallet_code, take_wallet_code, total_coin_NTC, total_coin_NCO)
        console.log("ok");
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const postTrainsferUsd = async (req, res) => {

    try {
        const { transfer_wallet_code, take_wallet_code, total_coin_usd } = req.body;
        const response = await services.posttrainsferusd(transfer_wallet_code, take_wallet_code, total_coin_usd)
        console.log("ok");
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getHistoryTranfer = async (req, res) => {

    try {
        const response = await services.gethistorytranfer()
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getTopWallet = async (req, res) => {

    try {
        const response = await services.gettopwallet()
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getWallet = async (req, res) => {

    try {
        const response = await services.getwallet(req.params.transfer_wallet_code)
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getTotalTransfer = async (req, res) => {

    try {
        const response = await services.gettotaltransfer()
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getTotalcoin = async (req, res) => {

    try {        
        const response = await services.gettotalcoin()
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}