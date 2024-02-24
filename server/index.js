const express = require('express')
const cors = require('cors');
const movieController = require('./ctrl/moviesctrl')
const { getMovies, createMovie, deleteMovie, editMovie } = movieController
const baseURL = `/api/movies`;
const app = express();
const PORT = 4004;

app.use(express.json()); 
app.use(cors());

app.get(baseURL, getMovies);
app.post(baseURL, createMovie);
app.delete(`${baseURL}/:identification`, deleteMovie);
app.put(`${baseURL}/:identification`, editMovie);

app.get("/api/movies", (req, res) => {
    res.status(200).json(movies)
});

app.post(baseURL, (req, res) => {
    console.log('hello')
    const { title, rating, imageURL } = req.body
    const newMovie = {...req.body, id, rating: +rating}
    movies.push(newMovie)
    id =+ 1
    res.status(200).json(movies);
})

app.delete(`${baseURL}/:identification`, (req, res) => {
    const { identification } = req.params
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === parseInt(identification)) {
            movies.splice(i, 1)
            res.status(200).json(movies)
        }
    }
});

app.put(`${baseURL}/:identification`, (req, res) => {
    const { identification } = req.params
    const { type } = req.body
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === parseInt(identification)) {

            if (type === 'plus' && movies[i].rating < 5) {
                console.log(movies[i].rating)
                const newRating = movies[i].rating + 1
                movies[i]. rating = newRating
                res.status(200).json(movies)
                return
            } 
            
            if (type === 'minus' && movies[i].rating > 1) {
                const newRating = movies[i].rating - 1
                movies[i]. rating = newRating
                res.status(200).json(movies)
                return
            }
        }
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
