import * as controllers from '../controllers/index'
import express from 'express'
import verifyToken from '../middlewares/verify_token'

const router = express.Router()

// PUBLIC ROUTES
// router.use(verifyToken)
router.get('/:id', controllers.getCurrent)
// PRIVATE ROUTES




module.exports = router