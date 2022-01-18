const mongoose = require('mongoose')
if( process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const mode = process.env.DATABASE_URL
console.log(mode);

const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')

app.set(
    'view engine','ejs'
)
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('Conncted to Mongoose'))

const indexRouter = require('./routes/index')
app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)