const router = require('express').Router()
const ctrls = require('../controllers/post')
const uploadCloud = require('../config/cloudinary.config')
const { verifyToken, isAdmin, isHost } = require('../middlewares/auth')

router.post('/', verifyToken, isHost, uploadCloud.array('images', 10), ctrls.createPosts)
router.get('/user', verifyToken, isHost, ctrls.getPosts)
router.get('/', ctrls.getPostsByAdmin)
router.get('/home', ctrls.getHome)
router.get('/dashboard', verifyToken, isAdmin, ctrls.getDashboard)
router.post('/ratings', verifyToken, ctrls.ratings)
router.put('/admin/:pid', verifyToken, isAdmin, uploadCloud.array('images', 10), ctrls.updatePost)
router.delete('/admin/:pid', verifyToken, isAdmin, ctrls.deletedPostByAdmin)
router.put('/:pid', verifyToken, isHost, uploadCloud.array('images', 10), ctrls.updatePost)
router.get('/:pid', ctrls.getPostById)
router.delete('/:pid', verifyToken, isHost, ctrls.deletedPost)


module.exports = router