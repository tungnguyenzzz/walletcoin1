import * as services from "../services"

// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'

export const getCurrent = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await services.getOne(id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}