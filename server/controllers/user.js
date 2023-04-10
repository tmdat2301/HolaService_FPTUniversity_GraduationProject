const db = require('../models')
const asyncHandler = require('express-async-handler')
const makeId = require('uniqid')
const { gennerateAccessToken } = require('../middlewares/jwt')
const bcrypt = require('bcryptjs')
const sequelize = require('sequelize')

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) throw new Error('Missing inputs')
    const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
            name,
            pass: password,
            id: makeId(),
            email
        }
    })
    const token = response[1] && gennerateAccessToken(response[0].id, response[0].role)
    const rs = {
        success: token ? true : false,
        mes: token ? 'Đăng ký thành công!' : 'Email đã được sử dụng!',
    }
    if (token) rs.accessToken = token
    return res.json(rs)
})
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw new Error('Missing inputs')
    const response = await db.User.findOne({
        where: { email }
    })
    const isCorrectPassword = response && bcrypt.compareSync(password, response.pass)
    const token = isCorrectPassword && gennerateAccessToken(response.id, response.role)
    const rs = {
        success: token ? true : false,
        mes: token ? 'Đăng nhập thành công!' : response ? 'Sai mật khẩu!' : 'Email chưa được đăng ký!',
    }
    if (token) rs.accessToken = token
    return res.json(rs)
})
const adminRole = asyncHandler((req, res) => {
    return res.json({ success: true })
})
const getUsers = asyncHandler(async (req, res) => {
    const { page, limit, offset, order, name, ...query } = req.query
    const queries = {}
    const step = !page ? 0 : (+page - 1)
    queries.limit = +limit || +process.env.POST_LIMIT
    queries.offset = step * queries.limit
    if (name) query.name = { [Op.substring]: name }
    if (order) queries.order = [order]

    const response = await db.User.findAndCountAll({
        where: query,
        ...queries,
        include: [
            { model: db.Role, as: 'roleData', attributes: ['value', 'code'] },
            { model: db.Post, as: 'posts', attributes: ['id'] },
        ],
        distinct: true,
        attributes: {
            exclude: ['pass', 'rspasstk', 'rspassexp'],
        }
    })
    return res.json({
        success: response ? true : false,
        users: response ? response : 'Cannot get users'
    })
})
const getCurrent = asyncHandler(async (req, res) => {
    const { uid } = req.user
    const response = await db.User.findOne({
        where: { id: uid },
        attributes: { exclude: ['pass', 'rspasstk', 'rspassexp'] },
        include: [
            { model: db.Role, as: 'roleData', attributes: ['value'] },
            { model: db.Post, as: 'posts', attributes: ['id'] },

        ],
    })
    return res.json({
        success: response ? true : false,
        user: response ? response : 'Cannot get users'
    })
})
const updateProfile = asyncHandler(async (req, res) => {
    const { uid } = req.user
    if (req.file) req.body.image = req.file.path
    const response = await db.User.update(req.body, { where: { id: uid } })
    return res.json({
        success: response ? true : false,
        user: response ? response : 'Cannot update users'
    })
})
const getRoles = asyncHandler(async (req, res) => {
    const response = await db.Role.findAll()
    return res.json({
        success: response ? true : false,
        roles: response ? response : 'Cannot get roles'
    })
})
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    const response = await db.User.update(req.body, { where: { id: uid } })
    return res.json({
        success: response ? true : false,
        user: response ? response : 'Cannot update users'
    })
})
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) throw new Error('Missing inputs')
    const token = makeId()
    const response = await db.User.update({ rspasstk: token, rspassexp: 5 * 60 * 1000 }, { where: { email } })
    if (response[0] > 0) {
        const subject = 'Xác minh email quên mật khẩu'
        const html = `Xin vui lòng click vào link dưới đây để hoàn tất reset mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.SERVER_URL}/api/v1/user/registerfinal/${data.email}/${token}>Click here</a>`
        await sendMail({ email: email, html, subject })
    }
    return res.json({
        success: response[0] > 0 ? true : false,
        user: response[0] > 0 ? 'Hãy check mail để kích hoạt tài khoản' : 'Cannot update users'
    })
})
const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params
    const response = await db.User.destroy({ where: { id: uid } })
    return res.json({
        success: response ? true : false,
        mes: response ? 'Xóa user thành công' : 'Cannot delete users'
    })
})
module.exports = {
    register,
    login,
    adminRole,
    getUsers,
    getCurrent,
    updateProfile,
    getRoles,
    updateUserByAdmin,
    forgotPassword,
    deleteUser
}