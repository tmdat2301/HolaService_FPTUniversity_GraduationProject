const insert = require('./insert')
const category = require('./category')
const user = require('./user')
const post = require('./post')
const comment = require('./comment')
const foodType = require('./foodtype')
const { notFound, errorHandler } = require('../middlewares/errhandler')

const initWebRoutes = (app) => {
    app.use('/api/insert', insert)
    app.use('/api/category', category)
    app.use('/api/user', user)
    app.use('/api/post', post)
    app.use('/api/comment', comment)
    app.use('/api/foodtype', foodType)


    // app.use('/', (req, res) => { return res.send('SERVER ON') })

    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initWebRoutes