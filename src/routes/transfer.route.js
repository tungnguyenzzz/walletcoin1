import * as controllers from '../controllers/index'
import express from 'express'

const router = express.Router()

router.post('/postTrainsfer', controllers.postTransfer);
router.get('/getHistoryTranfer', controllers.getHistoryTranfer);
router.get('/getTopWalletNTC', controllers.getTopWalletNTC);
router.get('/getTopWalletNCO', controllers.getTopWalletNCO);
router.get('/getTopWalletNUSD', controllers.getTopWalletNUSD);


router.get('/getTotalTransfer', controllers.getTotalTransfer);
router.get('/getTotalcoin', controllers.getTotalcoin);
router.get('/getWallet/:transfer_wallet_code', controllers.getWallet);


module.exports = router