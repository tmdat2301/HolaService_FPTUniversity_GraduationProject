const db = require('../models')
const asyncHandler = require('express-async-handler')

const getFoodtype = asyncHandler(async (req, res) => {
    const response = await db.Foodtype.findAll()
    return res.json({
        success: response ? true : false,
        foodtypes: response ? response : 'Cannot get foodtype'
    })
})

module.exports = {
    getFoodtype
}