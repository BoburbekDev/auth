module.exports.useMiddlewares = async( express, app ) => {
    require('dotenv').config()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))   
    app.use(require('morgan')('tiny'))
    app.use(require('cors')())
    app.use('/api/user', require('../routes/users'))
}