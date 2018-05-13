const express = require('express');
const morgan = require('morgan');
const request = require('superagent');
const notifier = require('node-notifier');
const session = require('express-session');
const methodOverride = require('method-override');
const compression = require('compression');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: ['http://miweb.com']
};

const sessionOptions = {
  secret: '1234'
};
const moviesRouter = require('./src/api/movies');

function errorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }
  const title = `Error in ${req.method} ${req.url}`;
  notifier.notify({ title: 'Error', message: title });
  res.status(500).send('Algo se ha roto!');
}

function errorSlack(err, req, res, next) {
  if (!err) {
    return next();
  }
  const errorSlack = { text: `Error in ${req.method} ${req.url}` };
  request.post('SLACK_URL')
    .send(errorSlack)
    .end(err => {
      next(err);
    });
}

app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(compression());
app.use(session(sessionOptions));
app.use(express.json());

app.use('/movies', moviesRouter);

app.get('/', (req, res, next) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
    console.log('Welcome');
  }
  console.log('VIEWS', req.session.views);
  res.json({ message: 'Hello world' });
});

if (process.env.NODE_ENV === 'development') {
  app.use(methodOverride());
  app.use(errorHandler);
} else {
  app.use(errorSlack);
}

app.listen(3000, () => {
  console.log('Ready on port 3000!');
});
