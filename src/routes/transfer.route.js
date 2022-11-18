import * as controllers from '../controllers/index'
import express from 'express'

const router = express.Router()

router.post('/postTrainsfer', controllers.postTransfer);
router.post('/postTrainsferUsd', controllers.postTrainsferUsd);
router.get('/getHistoryTranfer', controllers.getHistoryTranfer);
router.get('/getTopWallet', controllers.getTopWallet);
router.get('/getTotalTransfer', controllers.getTotalTransfer);
router.get('/getTotalcoin', controllers.getTotalcoin);
router.get('/getWallet/:transfer_wallet_code', controllers.getWallet);


module.exports = router