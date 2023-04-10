const jsonwebtoken = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(' ')[1]
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    mes: 'Invalid access token'
                })
            }
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication!'
        })
    }
}
const isAdmin = (req, res, next) => {
    const { role } = req.user
    if (role !== 'R1')
        throw new Error('Require Admin Role')
    next()
}
const isHost = (req, res, next) => {
    const { role } = req.user
    if (role !== 'R1' && role !== 'R2')
        throw new Error('Require Host Role')
    next()
}
module.exports = {
    verifyToken,
    isAdmin,
    isHost
}