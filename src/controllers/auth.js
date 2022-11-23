import * as services from "../services"
import { interalServerError, badRequest } from "../middlewares/handle_errors"
import { email, password, refreshToken } from "../helpers/joi_schema.js"
import joi from 'joi';
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
    try {
        const response = await services.register(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}


export const registerWithGoogle = async (req, res) => {

    try {
        const response = await services.registerWithGoogle(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}


export const login = async (req, res) => {
    try {
        const response = await services.login(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}
export const loginGoogle = async (req, res) => {
    try {
        const response = await services.loginGoogle(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}
export const refreshTokenController = async (req, res) => {
    try {
        const { error } = joi.object({ refreshToken }).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await services.refreshToken(req.body.refreshToken)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

// export const loginGoogleAuth = async (req, res) => {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: ""
//     });
//     const {name, email, picture} 
// }