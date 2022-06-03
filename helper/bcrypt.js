const {compare, hash} = require('bcryptjs')

exports.hashPassword = async(password) => {
    try {
        const result = await hash(password, 10)
        return result
    } catch (error) {
        throw new Error('Hash failed')
    }
}

exports.comparePassword = async( password, hash) => {
    try {
        const result = await compare(password, hash)
        return result
    } catch (error) {
        console.log(error)
        throw new Error('Compare failed')
    }
}