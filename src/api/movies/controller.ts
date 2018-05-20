import { MongoClient, Server, ObjectId } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017';

export function getLikes() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('eoiMovies');
        const moviesCollection = db.collection('movies');
        moviesCollection.find({ like: true }).toArray().then(movie => resolve(movie)).catch(errorDelete => reject(errorDelete));
      } else {
        reject(err);
      }
    });
  });
}

export function getMovie(movieId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('eoiMovies');
        const moviesCollection = db.collection('movies');
        moviesCollection.findOne({ _id: ObjectId(movieId) }).then(movie => resolve(movie)).catch(errorDelete => reject(errorDelete));
      } else {
        reject(err);
      }
    });
  });
}

export function getMovies() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('eoiMovies');
        const moviesCollection = db.collection('movies');
        moviesCollection.find({}).limit(20).toArray()
          .then(movies => resolve(movies))
          .catch(errorFind => reject(errorFind));
      } else {
        reject(err);
      }
    });
  });
}

export function newMovie(movie) {
  return new Promise((resolve, reject) => {
    const movieToInsert = { ...movie, created: new Date(), updated: new Date() };
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('eoiMovies');
        const moviesCollection = db.collection('movies');
        moviesCollection.insertOne(movieToInsert)
          .then(() => resolve(movieToInsert))
          .catch(insertError => reject(insertError));
      } else {
        reject(err);
      }
    });
  });
}

export function updateMovie(movie) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('eoiMovies');
        const moviesCollection = db.collection('movies');
        const movieToUpdate = { ...movie, updated: new Date() };
        const query = { _id: ObjectId(movie._id) };
        const body = { $set: movieToUpdate };
        const options = { returnOriginal: false, upsert: false };
        moviesCollection.findOneAndUpdate(query, body, options).then(() => {
          resolve();
        }).catch(findUpdateError => reject(findUpdateError));
      } else {
        reject(err);
      }
    });
  });
}

export function deleteMovie(movieId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('eoiMovies');
        const moviesCollection = db.collection('movies');
        moviesCollection.findOneAndDelete({ _id: ObjectId(movieId) }).then(() => resolve()).catch(errorDelete => reject(errorDelete));
      } else {
        reject(err);
      }
    });
  });
}

export function setLikeMovie(movieId, likeValue) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('eoiMovies');
        const moviesCollection = db.collection('movies');
        const query = { _id: ObjectId(movieId) };
        const body = { $set: { like: likeValue, updated: new Date() } };
        const options = { returnOriginal: false, upsert: false };
        moviesCollection.findOneAndUpdate(query, body, options).then(() => resolve()).catch(findUpdateError => reject(findUpdateError))
      } else {
        reject(err);
      }
    });
  });
}
