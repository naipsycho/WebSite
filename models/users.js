const {Schema, model} = require('mongoose')

const newUser = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
         admin: false
    },
    realname: {
        type: String
    },
    image: {
        type: String,
        default: 'avatar.jpg'
    },
    about: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type: String
    }
})

module.exports = model('post', newUser)