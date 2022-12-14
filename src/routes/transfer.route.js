import * as controllers from '../controllers/index'
import express from 'express'

const router = express.Router()

router.post('/postTrainsfer', controllers.postTransfer);
router.post('/getHistoryTranfer', controllers.getHistoryTranfer);
router.post('/searchHistoryTransfer', controllers.searchHistoryTransfer);
router.get('/getTopWalletNTC', controllers.getTopWalletNTC);
router.get('/getTopWalletNCO', controllers.getTopWalletNCO);
router.get('/getTopWalletNUSD', controllers.getTopWalletNUSD);
router.post('/searchTopWalletByCoin', controllers.searchTopWalletByCoin);


router.get('/getTotalTransfer', controllers.getTotalTransfer);
router.get('/getTotalcoin', controllers.getTotalcoin);
router.get('/getWallet/:transfer_wallet_code', controllers.getWallet);


module.exports = router