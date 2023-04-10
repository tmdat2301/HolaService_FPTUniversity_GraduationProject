const router = require('express').Router()
const ctrls = require('../controllers/insert')

router.post('/', ctrls.insertData)
router.post('/rent', ctrls.insertRented)


module.exports = router