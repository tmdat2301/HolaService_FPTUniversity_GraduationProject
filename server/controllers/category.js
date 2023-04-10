const db = require('../models')
const asyncHandler = require('express-async-handler')

const getCategories = asyncHandler(async (req, res) => {

    const response = await db.Category.findAll()
    const userId = req.body?.uid || 'anon'
    const rs = await db.Visited.findOne({ where: { uid: userId } })
    if (rs) {
        await rs.increment('times', { by: 1 })
    } else {
        await db.Visited.create({ uid: userId })
    }
    return res.json({
        success: response ? true : false,
        categories: response ? response : 'Cannot get categories'
    })
})

module.exports = {
    getCategories
}