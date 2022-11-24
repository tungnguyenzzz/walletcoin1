import * as services from "../services"

export const postTransfer = async (req, res) => {
    try {
        const { user_id, transfer_wallet_code, take_wallet_code, total_coin_NTC, total_coin_NCO, total_coin_NUSD } = req.body;
        const response = await services.posttransfer(user_id, transfer_wallet_code, take_wallet_code, total_coin_NTC, total_coin_NCO, total_coin_NUSD)
        console.log("ok");
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getHistoryTranfer = async (req, res) => {

    try {
        const { coinType, offset, pageItem } = req.body
        console.log(coinType, offset, pageItem)
        const response = await services.gethistorytranfer(coinType, offset, pageItem)

        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getTopWalletNTC = async (req, res) => {

    try {
        const response = await services.gettopwalletNTC()

        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getTopWalletNCO = async (req, res) => {

    try {
        const response = await services.gettopwalletNCO()

        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getTopWalletNUSD = async (req, res) => {

    try {
        const response = await services.gettopwalletNUSD()

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