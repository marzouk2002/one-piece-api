const mongoose = require('mongoose')

const charSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
    },
    appearance: {
        type: String,
    },
    personality: {
        type: String,
    },
    abilities: {
        type: String,
    },
    gallery: {
        route: {
            type: String
        },
        numPicture: {
            type: Number
        }
    },
    comments: {
        type: Array,
        default:[]
    }
}, {collection:'characters'})

const Characters = mongoose.model('characters', charSchema)

module.exports = Characters