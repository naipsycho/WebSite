const { Router } = require('express')

const router = Router()

const Users = require('../models/users')

const avatarup = require('../middleware/fileupload')

router
    .get('/', async (req, res)=>{
        const One = await Users.findById(req.session.user)
        res.render('account',{
            title: 'Acc',
            One
        })
    })

    .post('/change',  async(req, res)=>{
        const {id} = req.body
        delete req.body.id
        await Users.findByIdAndUpdate(id, req.body)
        res.redirect('/account')
    })

    .post('/', avatarup.single('image'), async(req, res)=>{
        console.log(req.file)
        await Users.updateOne({_id: req.session.user},{image: req.file.filename})
        res.redirect('/account')
    })

module.exports = router