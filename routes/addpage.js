const { Router } = require('express')

const router = Router()

const Note = require('../models/notes')

const Users = require('../models/users')

const imageupload = require('../middleware/fileupload')


router
    .get('/', async (req,res)=>{
        const One = await Users.findById(req.session.user)
        res.render('newnote', {
            title: 'Add',
            One,
            style: '/add.css'
        })
    })

    .post('/', imageupload.single('image') , async(req, res)=>{
        console.log(req.file)
        const addnote = new Note({
            title: req.body.title,
            info: req.body.info,
            image: req.file.filename
        })
        await addnote.save()
        res.redirect('/about')
    })

module.exports = router