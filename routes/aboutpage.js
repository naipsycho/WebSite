const { Router } = require('express')

const router = Router()

const Users = require('../models/users')

const Note = require('../models/notes')


router
    .get('/', async(req,res)=>{
        const notes = await Note.find()
        const One = await Users.findById(req.session.user)
        res.render('about', {
            title: 'Add',
            notes,
            One,
            style: '/about.css'
        })
    })

    .get('/:id/reduct', async(req, res)=>{
        const one = await Note.findById(req.params.id)
        const One = await Users.findById(req.session.user)
        res.render('onlyone',{
            title: 'One',
            one,
            One,
            style: '/reduct.css'
        })
    })


    .post('/reduct', async(req, res)=>{
        const {id} = req.body
        delete req.body.id
        await Note.findByIdAndUpdate(id, req.body)
        res.redirect('/about')
    })

    .post('/delete', async(req, res)=>{
        await Note.deleteOne({
            _id: req.body.id
        })
            res.redirect('/about')
    })

module.exports = router