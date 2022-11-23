import * as controllers from '../controllers/index'
import express from 'express'

const router = express.Router()

router.post('/postKyc', controllers.postKyc)
router.post('/getUserKyc', controllers.getPermissionKyc)


module.exports = router