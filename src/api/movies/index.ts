import * as express from 'express';
import { deleteMovie, getLikes, getMovie, getMovies, newMovie, setLikeMovie, updateMovie } from "./controller";

const router = express.Router();

router.get('/like', (req, res) => {
  getLikes().then(movies => res.json(movies)).catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  getMovie(req.params.id).then(movie => res.json(movie)).catch(err => res.status(500).send(err));
});

router.get('/', (req, res) => {
  getMovies().then(movies => res.json(movies)).catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
  newMovie(req.body).then(result => res.json(result)).catch(err => res.status(400).send(err));
});

router.put('/', (req, res) => {
  updateMovie(req.body).then(movie => res.json(movie)).catch(err => res.status(400).send(err));
});

router.delete('/:id', (req, res) => {
  deleteMovie(req.params.id).then(() => res.send()).catch(err => res.status(400).send(err));
});

router.post('/like/:id', (req, res) => {
  setLikeMovie(req.params.id, true).then(() => res.send('Done')).catch(err => res.status(400).send(err));
});

router.delete('/like/:id', (req, res) => {
  setLikeMovie(req.params.id, false).then(() => res.send('Done')).catch(err => res.status(400).send(err));
});

export = router;
