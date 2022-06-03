const router = require('express').Router()
const user = require('../controllers/user')
const authUser = require('../helper/auth')

    router.post('/login', user.login)
    router.post('/register', user.register)
    router.get('/getUsers', authUser.authUser, user.getUsers)

module.exports = router
