const {Schema, model} = require('mongoose')

const newNote = new Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true,
    },
    image: {
        type: String
    }
})

module.exports = model('notes', newNote)