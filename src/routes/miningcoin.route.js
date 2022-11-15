import * as controllers from '../controllers/miningcoin.controller'
import express from 'express'

const router = express.Router()

router.post('/postMiningCoin', controllers.postMiningCoin)


module.exports = router