const router = require('express').Router()
const ctrls = require('../controllers/category')

router.get('/', ctrls.getCategories)


module.exports = router