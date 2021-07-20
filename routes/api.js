require('dotenv').config()
const express = require('express')
const Arcs = require('../models/Arc')
const Episodes = require('../models/Episode')
const Characters = require('../models/Character')
const path = require('path')

const router = express.Router()

//GET aLL characters
router.get('/characters', async (req, res)=> {
    const allChar = await Characters.find({}, { name: 1, _id: 1, gallery: 1 })
    const Data= allChar.map(({ name, _id, gallery})=>{
        // const pictureNum = char.gallery.numPicture

        // const galArr = Array(pictureNum).fill(null).map((x, i) => {
        //     return `${process.env.HOST_URL}/api/characters/${route}/pic-${i}.png`
        // })
        return {
            name, _id,
            picture: `${process.env.HOST_URL}/api/characters/${gallery.route}/pic-0.png`
        }
     })
    res.json(Data)
})

//GET all episodes
router.get('/ep', async (req, res)=> {
    const allEp = await Episodes.find({}).sort('number')
    const Data = allEp.map(episode=>{
        const route= episode.poster
        return {
            ...episode,
            poster:`${process.env.HOST_URL}/api/episodes/${route}.png`
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
            poster:`${process.env.HOST_URL}/api/arcs/${route}.png`
        }
    })
    res.json(Data)
})

router.use(express.static(path.join(__dirname, '..', 'gallery')))

module.exports = router
