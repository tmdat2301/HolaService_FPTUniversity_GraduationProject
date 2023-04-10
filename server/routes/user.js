const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyToken, isAdmin } = require('../middlewares/auth')
const uploader = require('../config/cloudinary.config')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/role', verifyToken, isAdmin, ctrls.adminRole)
router.get('/roles', verifyToken, isAdmin, ctrls.getRoles)
router.get('/current', verifyToken, ctrls.getCurrent)
router.get('/', verifyToken, isAdmin, ctrls.getUsers)
router.put('/admin/:uid', verifyToken, isAdmin, uploader.single('image'), ctrls.updateUserByAdmin)
router.delete('/admin/:uid', verifyToken, isAdmin, ctrls.deleteUser)
router.put('/:uid', verifyToken, uploader.single('image'), ctrls.updateProfile)


module.exports = router