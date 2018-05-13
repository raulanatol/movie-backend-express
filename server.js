const express = require('express');
const files = require("./src/utils/files");
const app = express();

let movies;
files.loadMovies(moviesData => movies = moviesData);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.get('/movies/like', (req, res) => {
  const likeMovies = movies.filter(movie => movie.like === true);
  res.json(likeMovies);
});

app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find(movie => movie.id === movieId);
  res.json(movie);
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const movie = req.body;
  movie.id = `${movies.length + 1}`;
  movies.push(movie);

  files.saveMovies(movies, err => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

app.put('/movies', (req, res) => {
  const movieId = req.body.id;
  let moviePosition = movies.findIndex(movie => movie.id === movieId);
  if (moviePosition >= 0) {
    movies[moviePosition] = req.body;
  }

  files.saveMovies(movies, err => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

app.delete('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const moviePosition = movies.findIndex(movie => movie.id === movieId);
  if (moviePosition >= 0) {
    movies.splice(moviePosition, 1);
  }

  files.saveMovies(movies, err => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

app.post('/movies/like/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    movie.like = true;
  }

  files.saveMovies(movies, err => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

app.delete('/movies/like/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    movie.like = false;
  }
  files.saveMovies(movies, err => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

app.listen(3000, () => {
  console.log('Ready on port 3000!');
});
