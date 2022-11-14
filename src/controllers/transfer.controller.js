import * as services from "../services"

export const postTransfer = async (req, res) => {

    try {
        const { transfer_wallet_code, take_wallet_code, total_coin, total_coin_referral } = req.body;
        const response = await services.posttransfer(transfer_wallet_code, take_wallet_code, total_coin, total_coin_referral)
        console.log("ok");
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}