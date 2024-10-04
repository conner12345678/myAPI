const express = require('express')
const app = express()
// const {movies, actors} = require('./db/movies.js')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:true }))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')))

const getMovies = () => {
    const data = fs.readFileSync('./db/movies.json', 'utf8')
    return JSON.parse(data)
}

const getActors = () => {
    const data = fs.readFileSync('./db/actors.json', 'utf8')
    return JSON.parse(data)
}

const saveMovies = (movies) => {
    fs.writeFileSync('./db/movies.json', JSON.stringify(movies, null, 2), 'utf8')
}

const saveActors = (actors) => {
    fs.writeFileSync('./db/actors.json', JSON.stringify(actors, null, 2), 'utf8')
}

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/api/movies', (req,res) => {
    const theMovies = getMovies()
    res.json(theMovies)
})

app.get('/api/:id/movie', (req,res) => {
    const movies = getMovies()
    const singleMovie = movies.findIndex(movie => movie.id == req.params.id)
    const theMovie = movies.find((movie) => movie.id == Number(singleMovie+1))
    console.log(theMovie)
    return res.json(theMovie)
})

app.get('/form/:password', (req,res) => {
    const {password} = req.params
    if(password === 'word'){
        res.sendFile(path.join(__dirname, './public/form.html'))
    }else{
        res.status(404).send('YOU DONT BELONG HERE!! LEAVE OR BE DICINTEGRATED')
    }
})

app.post('/form', (req,res) => {
    const movies = getMovies()
    const actors = getActors()
    const {movie, yearCreated, actor, birthDate} = req.body
    const newMovie =  {
        id: movies.length + 1,
        movie: movie,
        yearCreated: yearCreated
    }
    const newActor = {
        actor_id: actors.length+1,
        actor: actor,
        birthDate: birthDate,
        comment: "this is the new comments"
    }
    movies.push(newMovie)
    saveMovies(movies)
    actors.push(newActor)
    saveActors(actors)
    res.redirect('/')
})

// app.get('/delete/:password', (req,res) => {
//     const {password} = req.params
//     if(password === 'AhPerryThePlatipusHowVeryUnexpectedOfYouAndByUnexpectedIMeanCompleatlyExpected'){
//         res.sendFile(path.join(__dirname, './public/delete.html'))
//     }else{
//         res.status(404).send('Introducing the deny you accessinator!')
//     }
// })

app.delete('/delete/redir/:password/:id', (req,res) => {
    const {password, id} = req.params
    if(password === 'AhPerryThePlatipusHowVeryUnexpectedOfYouAndByUnexpectedIMeanCompleatlyExpected'){
        const movies = getMovies()
        const actors = getActors()
        const index = movies.findIndex(movie => movie.id === id)
        if(index == -1){
            res.status(404).send('The Id was not found')
        }else{
            movies.splice(index, 1)
            actors.splice(index, 1)
            saveMovies(movies)
            saveActors(actors)
            res.redirect('/')
        }
    }else{
        res.status(404).send('Introducing the deny you accessinator!')
    }
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
})