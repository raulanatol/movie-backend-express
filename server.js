const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const app = express();

const sessionOptions = {
  secret: '1234'
};
const moviesRouter = require('./src/api/movies');

app.use(morgan('combined'));
app.use(session(sessionOptions));
app.use(express.json());
app.use('/movies', moviesRouter);

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
    console.log('Welcome');
  }
  console.log('VIEWS', req.session.views);
  res.json({ message: 'Hello world' });
});

app.listen(3000, () => {
  console.log('Ready on port 3000!');
});
