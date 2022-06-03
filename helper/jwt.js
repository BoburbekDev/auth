const {sign, verify} = require('jsonwebtoken')

exports.sign = (id, username) => sign({id, username}, process.env.JWT_KEY)
exports.verify = (data) => verify(data, process.env.JWT_KEY)