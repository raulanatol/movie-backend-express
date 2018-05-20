import { Movie } from "./model";

export function getLikes() {
  return Movie.find({ like: true });
}

export function getMovie(movieId) {
  return Movie.findById(movieId);
}

export function getMovies() {
  return Movie.find();
}

export function newMovie(movie) {
  const movieToCreate = new Movie({ ...movie });
  return movieToCreate.save();
}

export function updateMovie(movie) {
  return Movie.findByIdAndUpdate(movie._id, movie);
}

export function deleteMovie(movieId) {
  return Movie.findByIdAndRemove(movieId);
}

export function setLikeMovie(movieId, likeValue) {
  return Movie.findByIdAndUpdate(movieId, { like: likeValue });
}
