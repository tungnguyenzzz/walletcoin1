import * as services from "../services"

// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'

export const getCurrent = async (req, res, next) => {
    try {
        const { email } = req.body
        const response = await services.getOne(email)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const sendEmail = async (req, res, next) => {
    try {
        const response = await services.sendMail()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}