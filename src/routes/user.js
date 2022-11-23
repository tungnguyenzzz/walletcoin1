import * as controllers from '../controllers/index'
import express from 'express'
import verifyToken from '../middlewares/verify_token'

const router = express.Router()

// PUBLIC ROUTES
// router.use(verifyToken)
router.post('/getProfile', controllers.getProfile)
router.post('/codeReferral', controllers.codeReferral)
router.get('/sendMail', controllers.sendEmail)
router.get('/:id/verify/:code_verify', controllers.verifyEmail)
// PRIVATE ROUTES




module.exports = router