const mongoose = require('mongoose')

const epSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    poster: {
        type: String
    },
    intro: {
        type: String
    },
    resume: {
        type: String
    },
    comments: {
        type: Array,
        default:[]
    }
})

const Episodes = mongoose.model('episodes', epSchema)

module.exports = Episodes