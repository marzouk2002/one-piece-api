const express = require('express')
const Arcs = require('../models/Arc')
const Episodes = require('../models/Episode')
const Characters = require('../models/Character')
const path = require('path')

const router = express.Router()

//GET aLL characters
router.get('/characters', async (req, res)=> {
    const allChar = await Characters.find({})
    const Data= allChar.map((char)=>{
        const route= char.gallery.route
        const pictureNum = char.gallery.numPicture

        const galArr = Array(pictureNum).fill(null).map((x, i) => {
            return `https://one-piece-encyclo-api.herokuapp.com/api/characters/${route}/pic-${i}.png`
        })
        return {
            ...char,
            gallery: [...galArr]
        }
     })
    res.json(Data)
})

//GET all episodes
router.get('/ep', async (req, res)=> {
    const allEp = await Episodes.find({})
    const Data = allEp.map(episode=>{
        const route= episode.poster
        return {
            ...episode,
            poster:`https://one-piece-encyclo-api.herokuapp.com/api/episodes/${route}.png`
        }
    })
    res.json(Data)
})

//GET all arcs 
router.get('/arcs', async (req, res)=> {
    const allArc= await Arcs.find({})
    const Data = allArc.map(arc=>{
        const route= arc.poster
        return {
            ...arc,
            poster:`https://one-piece-encyclo-api.herokuapp.com/api/arcs/${route}.png`
        }
    })
    res.json(Data)
})

router.use(express.static(path.join(__dirname, '..', 'gallery')))

module.exports = router
