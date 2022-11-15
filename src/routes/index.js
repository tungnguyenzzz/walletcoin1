import user from './user'
import auth from './auth'
import kyc from './kyc.route'
import transfer from './transfer.route'
import miningcoin from './miningcoin.route'
const initRoutes = (app) => {

    app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/kyc', kyc)
    app.use('/api/v1/transfer', transfer)
    app.use('/api/v1/miningcoin', miningcoin)


}

module.exports = initRoutes