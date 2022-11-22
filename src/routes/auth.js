import * as controllers from '../controllers'
import express from 'express'

const router = express.Router()

router.post('/register', controllers.register)
router.post('/register-google', controllers.registerWithGoogle)
router.post('/login', controllers.login)
router.post('/login-google', controllers.loginGoogle)
router.post('/refresh-token', controllers.refreshTokenController)


module.exports = router