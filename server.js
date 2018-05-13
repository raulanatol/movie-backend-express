const express = require('express');
const morgan = require('morgan');
const notifier = require('node-notifier');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

const sessionOptions = {
  secret: '1234'
};
const moviesRouter = require('./src/api/movies');

function errorHandler(req, res) {
  const title = `Error in ${req.method} ${req.url}`;
  notifier.notify({ title: 'Error', message: title });
  res.status(500).send('Algo se ha roto!');
}

app.use(morgan('combined'));
app.use(session(sessionOptions));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(methodOverride());
  app.use(errorHandler);
}

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
