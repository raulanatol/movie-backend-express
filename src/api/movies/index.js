const express = require('express');
const router = express.Router();
const files = require("../../utils/files");

let movies;
files.loadMovies(moviesData => movies = moviesData);

router.get('/like', (req, res) => {
  const likeMovies = movies.filter(movie => movie.like === true);
  res.json(likeMovies);
});

router.get('/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find(movie => movie.id === movieId);
  res.json(movie);
});

router.get('/', (req, res) => {
  res.json(movies);
});

router.post('/', (req, res) => {
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

router.put('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.post('/like/:id', (req, res) => {
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

router.delete('/like/:id', (req, res) => {
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


module.exports = router;
