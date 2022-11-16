import jwt from 'jsonwebtoken'
require('dotenv').config()
const verifyToken = (req, res, next) => {
    let accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) return res.status(401).json({
        err: 1,
        msg: 'Missing access token'
    })

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({
            err: 1,
            msg: 'Access token expired or wrong'
        })

        req.user = user
        next()
    })


}

export default verifyToken