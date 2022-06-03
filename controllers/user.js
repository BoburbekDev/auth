const User = require('../models/User')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
exports.register = async(req, res) => {
    try {
        const hashPassword = await bcrypt.hashPassword(req.body.password)
        const user = await User.create({
            ...req.body,
            password: hashPassword
        })
        const token = jwt.sign(user._id, user.username)
        res.status(201).json({
            message: "Created",
            data: {
                user,
                token
            }
        })
        
    } catch (error) {
        const msg =
        error.code === 11000
          ? `Users username adress is exist`
          : error.message;
        res.status(409).json({
            error: msg
        })   
    }
}

exports.login = async(req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user && !(await bcrypt.comparePassword(password, user.password))) {
            return res.status(400).json({
                message: "Wrong Credentials",
            })
        }
        const token = jwt.sign(user._id, user.username)
        res.status(200).json({
            message: "OK",
            token
        })
    } catch (error) {
        console.log(error)
        res.status(409).json({
            message: "Fail",
            error
        })
    }
}

exports.getUsers = async(req, res) => {
    try {
        if(req.header('role') === 'super'){
            const simpleUsers = await User.find({role: {$ne: 'User'}},{'password': 0})
            const users = await User.find({role: 'User'},{'password': 0})
            simpleUsers.forEach(user => users.push({...user._doc, username: '...'}))
            return res.status(200).json({ message: "OK", users})
        } 
        const users = await User.find({},{'password': 0})
        res.status(200).json({ message: "OK", users})
    } catch (error) {
        console.log(error)
        res.status(409).json({
            message: "Fail",
            error
        })
    }
}