import * as controllers from '../controllers/index'
import express from 'express'
import verifyToken from '../middlewares/verify_token'

const router = express.Router()

// PUBLIC ROUTES


// PRIVATE ROUTES
router.use(verifyToken)
router.get('/', controllers.getCurrent)


module.exports = router