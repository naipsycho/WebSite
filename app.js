


const express = require('express')
const expHB = require('express-handlebars')
const app = express()
const path = require('path')
app.use(express.urlencoded({extended: true}))
const mongo = require('mongoose')
const Handlebars = require('handlebars')
const conf = require('config')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override')


const session = require('express-session')
const saveSes = require('connect-mongodb-session')(session)

const store = new saveSes({
    collection: "mySession",
    uri: conf.get('url')
})



const PORT = conf.get('port')
const hbs = expHB.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})


app.use(session({
    secret: "Keys",
    resave: true,
    saveUninitialized: true,
    store: store
}))

const isAuth = require('./middleware/auth')

app.use(isAuth)

app.use(express.static(__dirname + '/public/css'));
app.use(express.static('client/uploads/images'));
app.use(express.static('client/uploads/avatar'));

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(methodOverride('_method'))


app.use('/account', require('./routes/account'))
app.use('/add', require('./routes/addpage'))
app.use('/about', require('./routes/aboutpage'))
app.use('/', require('./routes/homepage') )


async function connectTo(){
    try{
        await mongo.connect(conf.get('url', {urlNewUserParse: true, useUnifiedTopology: true}))

        app.listen(PORT, ()=>{
            console.log(`Server: ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }
}
connectTo()
