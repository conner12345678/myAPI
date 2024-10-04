const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:true }))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')))

//Gets the list of movies
const getMovies = () => {
    const data = fs.readFileSync('./db/movies.json', 'utf8')
    return JSON.parse(data)
}


//Gets the list of actors
const getActors = () => {
    const data = fs.readFileSync('./db/actors.json', 'utf8')
    return JSON.parse(data)
}

//Updates the list of movies by overwriting them when used
const saveMovies = (movies) => {
    fs.writeFileSync('./db/movies.json', JSON.stringify(movies, null, 2), 'utf8')
}

//Updates the list of actors by overriding them when used
const saveActors = (actors) => {
    fs.writeFileSync('./db/actors.json', JSON.stringify(actors, null, 2), 'utf8')
}

//Gets the homepage of the website
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

//Gaets the list of movies
app.get('/api/movies', (req,res) => {
    const theMovies = getMovies()
    res.json(theMovies)
})

//Gets the list of actors
app.get('/api/actors', (req,res)=>{
    const theActors = getActors()
    res.json(theActors)
})

//Gets a specific movie
app.get('/api/:id/movie', (req,res) => {
    const movies = getMovies()
    const singleMovie = movies.findIndex(movie => movie.id == req.params.id)
    const theMovie = movies.find((movie) => movie.id == Number(singleMovie+1))
    return res.json(theMovie)
})

//Gets a specific actor
app.get('/api/:actor_id/actor', (req,res)=>{
    const actors = getActors()
    const singleActor = actors.findIndex(actor => actor.actor_id == req.params.actor_id)
    const theActor = actors.find((actor) => actor.actor_id == Number(singleActor+1))
    return res.json(theActor)
})

//gets the form page
app.get('/form/:password', (req,res) => {
    const {password} = req.params
    //Checks if the user added the propper password
    if(password === 'TheUltimateQuestionToTheUltimateAnswer'){
        res.sendFile(path.join(__dirname, './public/form.html'))
    }else{
        res.status(404).send('YOU DONT BELONG HERE!! LEAVE OR BE DICINTEGRATED')
    }
})

//The redirect page that takkes you back to the home page once you have entered the new information for the movie and actor
app.post('/form', (req,res) => {
    const movies = getMovies()
    const actors = getActors()
    const {movie, yearCreated, actor, birthDate} = req.body
    //Collects the information for the new movie off of the form page
    const newMovie =  {
        id: movies.length + 1,
        movie: movie,
        yearCreated: yearCreated
    }
    //Collects the information for the new actor off of the form page
    const newActor = {
        actor_id: actors.length+1,
        actor: actor,
        birthDate: birthDate,
        comment: "this is the new comments"
    }
    //Saves the new movie and actor to their respective json files and then redirects to the home page
    movies.push(newMovie)
    saveMovies(movies)
    actors.push(newActor)
    saveActors(actors)
    res.redirect('/')
})

//deletes aspecified actor and movie
app.delete('/delete/redir/:password/:id', (req,res) => {
    const {password, id} = req.params
    //Checks if you have entered the right password before deleting the actor and movie specified
    if(password === 'AhPerryThePlatipus'){
        const movies = getMovies()
        const actors = getActors()
        const index = movies.findIndex(movie => movie.id === id)
        if(index == -1){
            res.status(404).send('The Id was not found')
        }else{
            //Deletes the specified actor and movie and saves the change to the respective files
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

//Runs the server
app.listen(5000, () => {
    console.log('Server running on port 5000')
})