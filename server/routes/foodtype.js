const router = require('express').Router()
const ctrls = require('../controllers/foodtype')

router.get('/', ctrls.getFoodtype)


module.exports = router