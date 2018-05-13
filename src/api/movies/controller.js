const files = require("../../utils/files");

let movies;
files.loadMovies(moviesData => movies = moviesData);

function getLikes() {
  return movies.filter(movie => movie.like === true);
}

function getMovie(movieId) {
  return movies.find(movie => movie.id === movieId);
}

function getMovies() {
  return movies;
}

function newMovie(movie, callback) {
  movie.id = `${movies.length + 1}`;
  movies.push(movie);

  files.saveMovies(movies, err => callback(err, movies));
}

function updateMovie(movie, callback) {
  const movieId = movie.id;
  let moviePosition = movies.findIndex(movie => movie.id === movieId);
  if (moviePosition >= 0) {
    movies[moviePosition] = req.body;
  }

  files.saveMovies(movies, err => callback(err, movies));
}

function deleteMovie(movieId, callback) {
  const moviePosition = movies.findIndex(movie => movie.id === movieId);
  if (moviePosition >= 0) {
    movies.splice(moviePosition, 1);
  }

  files.saveMovies(movies, err => callback(err, movies));
}

function setLikeMovie(movieId, likeValue, callback) {
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    movie.like = likeValue;
  }

  files.saveMovies(movies, err => callback(err, movies));
}

module.exports = {
  getLikes,
  getMovie,
  getMovies,
  newMovie,
  updateMovie,
  deleteMovie,
  setLikeMovie
};
