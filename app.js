const express = require('express')
const app = express()
const {item1} = require('./db/movies.js')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:true }))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/form', (req,res) => {
    res.sendFile(path.join(__dirname, './public/form.html'))
})

app.post('form/redir', (req,res) => {
    const data = getData()
    res.redirect('/')
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
})