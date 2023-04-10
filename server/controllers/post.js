const db = require('../models')
const asyncHandler = require('express-async-handler')
const makeid = require('uniqid')
const { Op } = require('sequelize')
const { sequelize } = require('../models')


const createPosts = asyncHandler(async (req, res) => {
    const { uid } = req.user
    const { title, category } = req.body
    const { images, ...data } = req.body
    if (req.files) data.images = req.files.map(el => el.path)

    if (!title || !category) throw new Error('Missing inputs')
    const response = await db.Post.findOrCreate({
        where: { title },
        defaults: { ...data, postedBy: uid, id: makeid() }
    })
    return res.json({
        success: response[1] ? true : false,
        mes: response[1] ? 'Tạo bài đăng thành công' : 'Tựa đề bài đăng không được trùng nhau'
    })
})
const updatePost = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const { isAdmin } = req.body
    if (req.files) req.body.images = req.files.map(el => el.path)
    if (req.body.imageLink) req.body.images = req.body.imageLink
    const query = { id: pid }
    if (!isAdmin) query.postedBy = req.user.uid
    const response = await db.Post.update(req.body, { where: query })
    return res.json({
        success: response[0] > 0 ? true : false,
        createdPost: response[0] > 0 ? 'Upadted' : 'Cannot update post'
    })
})
const deletedPost = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const query = { id: pid }
    query.postedBy = req.user.uid
    const response = await db.Post.destroy({ where: query })
    return res.json({
        success: response > 0 ? true : false,
        createdPost: response > 0 ? 'Deleted' : 'Cannot delete post'
    })
})
const deletedPostByAdmin = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await db.Post.destroy({ where: { id: pid } })
    return res.json({
        success: response > 0 ? true : false,
        createdPost: response > 0 ? 'Deleted' : 'Cannot delete post'
    })
})
const getPosts = asyncHandler(async (req, res) => {
    const { page, limit, offset, order, title, ...query } = req.query
    const queries = {}
    query.postedBy = req.user.uid
    const step = !page ? 0 : (+page - 1)
    queries.limit = +limit || +process.env.POST_LIMIT
    queries.offset = step * queries.limit
    if (title) query.title = { [Op.substring]: title }
    if (order) queries.order = [order]
    else queries.order = [['updatedAt', 'DESC']]

    const response = await db.Post.findAndCountAll({
        where: query,
        ...queries,
        include: [
            { model: db.User, as: 'user', attributes: ['name', 'id', 'email'] },
            { model: db.Category, as: 'categoryData', attributes: ['code', 'value'] },
        ]
    })
    return res.json({
        success: response ? true : false,
        posts: response ? response : 'Cannot get post'
    })
})
const getPostsByAdmin = asyncHandler(async (req, res) => {
    const { page, limit, offset, order, title, price, distance, area, q, ...query } = req.query
    const queries = {}
    const step = !page ? 0 : (+page - 1)
    queries.limit = +limit || +process.env.POST_LIMIT
    queries.offset = step * queries.limit
    if (title) query.title = { [Op.substring]: title }
    if (order) queries.order = [order]
    else queries.order = [['updatedAt', 'DESC']]
    if (price) query.price = { [Op.between]: price[0].split(',')?.map(el => +el) }
    if (distance) query.distance = { [Op.between]: distance[0].split(',')?.map(el => +el) }
    if (area) query.area = { [Op.between]: area[0].split(',')?.map(el => +el) }
    if (q) query.title = { [Op.substring]: q }

    const response = await db.Post.findAndCountAll({
        where: query,
        ...queries,
        include: [
            { model: db.User, as: 'user', attributes: ['name', 'id', 'email'] },
            { model: db.Category, as: 'categoryData', attributes: ['code', 'value'] },
            { model: db.Foodtype, as: 'foodtypes', attributes: ['code', 'value'] },
        ]
    })
    return res.json({
        success: response ? true : false,
        posts: response ? response : 'Cannot get post'
    })
})
const getHome = asyncHandler(async (req, res) => {
    const response = await db.Post.findAll({
        include: [
            { model: db.User, as: 'user', attributes: ['name', 'id', 'email'] },
            { model: db.Category, as: 'categoryData', attributes: ['code', 'value'] },
            { model: db.Foodtype, as: 'foodtypes', attributes: ['code', 'value'] },
        ],
    })
    return res.json({
        success: response ? true : false,
        data: response ? response : 'Cannot get home'
    })
})
const ratings = asyncHandler(async (req, res) => {
    const { uid } = req.user
    const { pid, score } = req.body
    if (!uid || !pid || !score) {
        return res.status(400).json({
            err: 1,
            mes: 'Missing inputs'
        })
    }
    const alreadyVote = await db.Vote.findOne({ where: { pid, uid } })

    if (alreadyVote) {
        const response = await db.Vote.update(req.body, { where: { pid, uid } })
        const post = await db.Vote.findAll({ where: { pid }, raw: true })
        if (!post) {
            await db.Post.update({ star: score }, { where: { id: pid } })
        } else {
            const star = post?.reduce((sum, el) => sum + el.score, 0)
            await db.Post.update({ star: Math.round(star / post?.length) }, { where: { id: pid } })
        }
        return res.json({
            success: response ? true : false,
            data: response ? response : 'Cannot ratings'
        })
    } else {
        const response = await db.Vote.create({ ...req.body, uid })
        const post = await db.Vote.findAll({ where: { pid }, raw: true })
        if (!post) {
            await db.Post.update({ star: score }, { where: { id: pid } })
        } else {
            const star = post?.reduce((sum, el) => sum + el.score, 0)
            await db.Post.update({ star: Math.round(star / post?.length) }, { where: { id: pid } })
        }
        return res.json({
            success: response ? true : false,
            data: response ? response : 'Cannot ratings'
        })
    }



})
const getPostById = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await db.Post.findOne({
        where: { id: pid },
        include: [
            { model: db.User, as: 'user', attributes: ['name', 'id', 'email', 'phone', 'image'] },
            { model: db.Category, as: 'categoryData', attributes: ['code', 'value', 'slug'] },
            {
                model: db.Comment,
                as: 'comments',
                include: [
                    { model: db.User, as: 'commentator', attributes: ['name', 'image'] }
                ]
            },
            {
                model: db.Vote,
                as: 'votes',
                include: [{ model: db.User, as: 'userData', attributes: ['name', 'id', 'image'] }]
            },
        ],
    })
    return res.json({
        success: response ? true : false,
        post: response ? response : 'Cannot get post'
    })
})

const getDashboard = asyncHandler(async (req, res) => {
    // Số lượt truy cập
    // Sổ account tạo mới
    // Só lượng bài đăng
    const { days, type, from, to } = req.query
    const daysQuery = days || 220
    const typeDate = type === 'month' ? '%m-%y' : '%d-%m-%y'
    const start = from || Date.now() - daysQuery * 24 * 60 * 60 * 1000
    const end = to || Date.now()
    const q = {}
    if (from && to) {
        if (from === to)
            q.createdAt = { [Op.and]: [{ [Op.gte]: `${from} 00:00:00` }, { [Op.lte]: `${from} 23:59:59` }] }
        else
            q.createdAt = { [Op.and]: [{ [Op.lte]: `${end} 23:59:59` }, { [Op.gte]: `${start} 00:00:00` }] }
    }
    const [rent, eatery, other, user, views, postCount, userCount] = await Promise.all([
        db.Post.findAll({
            where: { ...q, category: 'TNT' },
            attributes: [
                [sequelize.fn('date_format', sequelize.col('createdAt'), typeDate), 'createdAt'],
                [sequelize.fn('count', sequelize.col('id')), 'counter']
            ],
            group: 'createdAt',
            order: [['createdAt', 'ASC']]
        }),
        db.Post.findAll({
            where: { ...q, category: 'TQA' },
            attributes: [
                [sequelize.fn('date_format', sequelize.col('createdAt'), typeDate), 'createdAt'],
                [sequelize.fn('count', sequelize.col('id')), 'counter']
            ],
            group: 'createdAt',
            order: [['createdAt', 'ASC']]
        }),
        db.Post.findAll({
            where: { ...q, category: 'DVK' },
            attributes: [
                [sequelize.fn('date_format', sequelize.col('createdAt'), typeDate), 'createdAt'],
                [sequelize.fn('count', sequelize.col('id')), 'counter']
            ],
            group: 'createdAt',
            order: [['createdAt', 'ASC']]
        }),
        db.User.findAll({
            where: q,
            attributes: [
                [sequelize.fn('date_format', sequelize.col('createdAt'), typeDate), 'createdAt'],
                [sequelize.fn('count', sequelize.col('id')), 'counter']
            ],
            group: 'createdAt',
            order: [['createdAt', 'ASC']],
        }),
        db.Visited.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('times')), 'views']
            ],
            raw: true
        }),
        db.Post.findAll({
            attributes: [
                [sequelize.fn('count', sequelize.col('id')), 'postCount']
            ],
            raw: true
        }),
        db.User.findAll({
            attributes: [
                [sequelize.fn('count', sequelize.col('id')), 'userCount']
            ],
            raw: true
        })
    ])
    return res.json({
        success: [rent, eatery, other, user, views, postCount, userCount] ? true : false,
        chartData: [rent, eatery, other, user, views, postCount, userCount]
            ? { rent, eatery, other, ...views[0], ...postCount[0], ...userCount[0], user }
            : 'Cannot get chart'
    })
})

module.exports = {
    createPosts,
    getPosts,
    updatePost,
    deletedPost,
    getHome,
    getPostById,
    getPostsByAdmin,
    ratings,
    getDashboard,
    deletedPostByAdmin
}