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
        
        return {
            name, _id,
            picture: `${process.env.HOST_URL}/api/characters/${gallery.route}/pic-0.png`
        }
     })
    res.json(Data)
})

// Get One Character
router.get('/character', async (req, res)=> {
    let id = req.query._id;
    const Char = await Characters.findById(id)
    const { numPicture, route } = Char.gallery
    const gallery = Array(numPicture).fill(null).map((x, i) => {
        return `${process.env.HOST_URL}/api/characters/${route}/pic-${i}.png`
    })
    res.json({...Char, gallery})
})

//GET all episodes
router.get('/eps', async (req, res)=> {
    const allEp = await Episodes.find({}, { number: 1, _id: 1, poster: 1, title: 1}).sort('number')
    const Data = allEp.map(episode=>{
        const route= episode.poster
        return {
            ...episode,
            poster:`${process.env.HOST_URL}/api/episodes/${route}.png`
        }
    })
    res.json(Data)
})

//GET One Episode
router.get('/ep', async (req, res)=> {
    let id = req.query._id;
    const episode = await Episodes.findById(id)
    res.json({ ...episode, poster:`${process.env.HOST_URL}/api/episodes/${episode.poster}.png`})
})

//GET all arcs 
router.get('/arcs', async (req, res)=> {
    const allArc= await Arcs.find({}, { _id: 1, poster: 1, title: 1})
    const Data = allArc.map(arc=>{
        const route= arc.poster
        return {
            ...arc,
            poster:`${process.env.HOST_URL}/api/arcs/${route}.png`
        }
    })
    res.json(Data)
})

// Get One Arc
router.get('/arc', async (req, res)=> {
    let id = req.query._id;
    const arc = await Arcs.findById(id)
    res.json({ ...arc, poster:`${process.env.HOST_URL}/api/arcs/${arc.poster}.png`})
})


router.use(express.static(path.join(__dirname, '..', 'gallery')))

module.exports = router
