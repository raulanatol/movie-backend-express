const fs = require('fs');

function loadMovies(callback) {
  const filePath = __dirname + '/../../data/movies.json';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error', err);
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
}

function saveMovies(movies, callback) {
  const filePath = __dirname + '/../../data/movies.json';
  const moviesJSON = JSON.stringify(movies);
  fs.writeFile(filePath, moviesJSON, (err, data) => {
    if (err) {
      console.error('Error', err);
      callback(err);
    } else {
      callback();
    }
  });
}

module.exports = {
  loadMovies,
  saveMovies
};
