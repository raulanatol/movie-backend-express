const express = require('express');
const app = express();

const moviesRouter = require('./src/api/movies');

app.use(express.json());
app.use('/movies', moviesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.listen(3000, () => {
  console.log('Ready on port 3000!');
});
