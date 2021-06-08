const mongoose = require('mongoose')

const arcSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poster: {
        type:String
    },
    intro: {
        type:String
    },
    resume: {
        type:String
    },
    impact: {
        type:String
    },
    comments: {
        type: Array,
        default:[]
    }
})

const Arcs = mongoose.model('arcs', arcSchema)

module.exports = Arcs