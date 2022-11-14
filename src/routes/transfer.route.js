import * as controllers from '../controllers/index'
import express from 'express'

const router = express.Router()

router.post('/postTrainsfer', controllers.postTransfer);


module.exports = router