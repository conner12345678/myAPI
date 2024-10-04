PLESE GO TO BLAME TO SEE THE NEAT VERSION.
I dont know if I had to say this or not lol

myAPI

This is my very first api


Admin information

To access the form and delete pages you need to use a password with the url or it will not work. The url to access the form page to add new items is:
/form/TheUltimateQuestionToTheUltimateAnswer

NOTE: This only works on the browser because I had to choose between the two and was told to use the browser and not postMan

The code for this is:
app.get('/form/:password', (req,res) => {
    const {password} = req.params
    if(password === 'TheUltimateQuestionToTheUltimateAnswer'){
        res.sendFile(path.join(__dirname, './public/form.html'))
    }else{
        res.status(404).send('YOU DONT BELONG HERE!! LEAVE OR BE DICINTEGRATED')
    }
})
 This defines the password and checks to see if it is the correct password before leting the user on the form page

 To access the delete page you need a password and the id number of the movie and actor that you want ton delete. The url for this should look something like this:
 /delete/redir/AhPerryThePlatipus/:id

 NOTE: Use an actual id number instead of :id
 NOTE: This only works on postMan, because you can not get a delete request.

 The code for this would look like this:
 app.delete('/delete/redir/:password/:id', (req,res) => {
    const {password, id} = req.params
    if(password === 'AhPerryThePlatipus'){
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
This checks if the user has put the right password into the url, and if they did it takes the id that the user gave it and deletes the actor and movie from their respective lists.
