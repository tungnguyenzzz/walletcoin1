import * as services from "../services"

export const postMiningCoin = async (req, res) => {

    try {
        const { user_id, time_start, time_over, status, total_coin } = req.body;
        const response = await services.postminingcoin( user_id, time_start, time_over, status, total_coin );
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}