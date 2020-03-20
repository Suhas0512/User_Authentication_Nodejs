const Message = require('../models/message')
const { authenticateUser } = require('../middlewares/authentication')
const express = require('express')
const router = express.Router() 

router.get('/', authenticateUser, (req, res) => {
    Message.find({user:req.user._id})
    .then(messages=>res.json(messages))
    .catch(err=>res.json(err))
})

router.post('/', authenticateUser, (req, res) => {
    const body = req.body 
    const message = new Message(body)
    
    message.save()
        .then(message => res.json(message))
        .catch(err => res.json(err))
})
router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id 
    Message.findOne({
        _id: id,
        user: req.user._id 
    })
    .then(message => {
        if(message) {
            res.json(message)
        } else {
            res.json({})
        }
    })
})

// put 
// Message.findOneAndUpdate({ _id: id, user: req.user._id})

// delete
// Message.findOneAndDelete({ _id: id, user: req.user._id })

module.exports = {
    messagesRouter: router
}