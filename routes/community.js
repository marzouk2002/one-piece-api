const express = require('express')
const bcrypt = require('bcryptjs')
const Arcs = require('../models/Arc')
const Episodes = require('../models/Episode')
const Characters = require('../models/Character')
const Member = require('../models/Member')
const { ResObj, Comment } = require('./Classes')

const router = express.Router()

router.use(express.json())

router.post('/members/login', async (req, res)=> {
    const  { email, password} = req.body
    Member.findOne({email: email})
        .then(member => {
            if(!member) {
                const resObj= new ResObj('That email is not registered', 'danger')
                res.json({status: false, ...resObj})
            } else {
                bcrypt.compare(password, member.password, (err, isMath)=>{
                    if(err) throw err

                    if(isMath) {
                        const resObj= new ResObj(`Welcome ${member.user_name}, you're now logged in enjoy the content`, 'success')
                        const memData = {
                            user_name: member.user_name,
                            id: member._id
                        }
                        res.json({status: true, ...resObj, memData})
                    }else {
                        const resObj= new ResObj('Password incorrect', 'danger')
                        res.json({status: false, ...resObj})
                    }
                })
            }
        })
})


router.post('/members/register', (req, res)=> {
    const userData = req.body
    const {  user_name, email, password } = userData
    Member.findOne({email: email})
        .then(user=> {
            if(user) {
                const resObj = new ResObj('Sorry, user already registered. Try new email', 'warning')
                res.json(resObj)
            } else {
                const newMember = new Member({ user_name, email, password })

                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err
                    bcrypt.hash(newMember.password, salt, (err, hash) => {
                        if(err) throw err

                        newMember.password = hash
                        newMember.save()
                            .then(member => {
                                const resObj = new ResObj(`Congratulation ${member.user_name}, you're now registered. Go over the login page to log in`, 'success')
                                res.json(resObj)
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })

})

router.post('/comments', async (req, res) => {
    const { memberName, memberId, contentId, comment, contentType } =req.body

    const newComment = new Comment(memberName, memberId, comment)

    let doc;
    switch(contentType) {
        case 'characters':
            doc = await Characters.findOne({ _id: contentId })
            break
        case 'arcs':
            doc = await Arcs.findOne({ _id: contentId })
            break
        case 'episodes':
            doc = await Episodes.findOne({ _id: contentId })
            break
        default: 
            res.json({error: 'contentType not found'})
            return
    }
    doc.comments.unshift(newComment)
    await doc.save()
        .then(savedDoc => { 
            res.json(savedDoc.comments)
        })
        .catch(err => res.json(err))
        
})

router.delete('/comments', async (req, res) => {
    const { commentId, contentType, contentId } = req.body

    let doc;
    switch(contentType) {
        case 'characters':
            doc = await Characters.findOne({ _id: contentId })
            break
        case 'arcs':
            doc = await Arcs.findOne({ _id: contentId })
            break
        case 'episodes':
            doc = await Episodes.findOne({ _id: contentId })
            break
        default: 
            res.json({error: 'contentType not found'})
            return
    }

    doc.comments = doc.comments.filter((comment)=> {
         return comment.id !== commentId
    }) 
    await doc.save()
        .then(savedDoc => { 
            res.json(savedDoc.comments)
        })
        .catch(err => res.json(err))
})

module.exports = router