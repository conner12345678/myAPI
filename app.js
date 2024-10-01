const express = require('express')
const app = express()
const {movies, actors} = require('./db/movies.js')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:true }))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/api/movies', (req,res) => {
    const theMovies = movies.map(theMovie => {
        const {movie, yearCreated} = theMovie
        return {movie, yearCreated}
    })
    res.json(theMovies)
})

app.get('/api/:id/movie', (req,res) => {
    const {id} = req.params
    const singleMovie = movies.find((movie) => movie.id === Number(id))
    if(!singleMovie){
        return res.status(404).send("Movie does not exist, and might never")
    }
    return res.json(singleMovie)
})

app.get('/form', (req,res) => {
    res.sendFile(path.join(__dirname, './public/form.html'))
})

app.post('/form/redir', (req,res) => {
    const {movie, yearCreated} = req.body
    const newMovie =  {
        id: movies.length + 1,
        movie: movie,
        yearCreated: yearCreated
    }
    movies.push(newMovie)
    res.redirect('/')
})

app.get('/delete', (req,res) => {
    res.sendFile(path.join(__dirname, './public/delete.html'))
})

app.delete('/delete/redir', (req,res) => {
    const id = req.body
    const index = movies.findIndex(movie => movie.id === id)
    if(!id){
        res.status(404).send('The Id was not found')
    }
    movies.splice(index, 1)
    res.redirect('/')
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
})