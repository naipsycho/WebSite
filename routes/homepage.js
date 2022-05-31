const { Router } = require('express')

const router = Router()

const Users = require('../models/users')


router
    .get('/', async (req, res)=>{
        const One = await Users.findById(req.session.user)
        res.render('home',{
            title: 'Home',
            One,
            style: '/home.css'
        })
    })

    
    .post('/reg', async(req, res)=>{
        try{
        const {username, email, password} = req.body
        const mbUser = await Users.findOne({email})
        if(mbUser){
            console.log('Такой есть')
            res.redirect('/')
        }else{
            const user = new Users({username, email, password})
            await user.save()
            res.redirect('/')
            console.log('Зареган')
        }}catch(e){
            console.log(e)
            res.status(401).send('Ошибка при регистрации')
        }
    })

    .post('/auth', async(req, res)=>{
        try{
            const {email, password} = req.body
            const mbUser = await Users.findOne({email})
                if(mbUser){
                    const mbPass = password === mbUser.password
                        if(mbPass){
                            req.session.user = mbUser
                            req.session.isAuthen = true
                            req.session.save(error=>{
                                if(error){
                                    throw error
                                }else{
                                    console.log('Зашел')
                                    res.redirect('/account')
                                }
                            })
                        }else{
                            console.log('Неверный пароль')
                            res.redirect('/')
                        }
                }else{
                    console.log('Такого аккаунта нету')
                    res.redirect('/')
                }
        }catch(e){
            console.log(e)
            res.status(401).send('Ошибка при авторизации')
        }
    })

    .get('/logout', async(req, res)=>{
        req.session.destroy(()=>{
            console.log('Вышел')
            res.redirect('/')
        })
    })

module.exports = router