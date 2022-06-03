const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required']
    },
    username: {
        type: String,
        required: [true, 'UserName is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'User'
    }
}, {
    versionKey: false
})

module.exports = model('User', userSchema)