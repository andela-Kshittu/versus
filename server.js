// Imports
const compression = require('compression');
const open = require('open');
const path = require('path');
const webpack = require('webpack');
const wpConfig = require('./webpack.config');

//sever imports
const bodyParser = require('body-parser');
const config = require('./config/config');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// Other variables
const app = express();
const compiler = webpack(wpConfig);
const PROD = process.env.NODE_ENV === 'production';
const port = PROD ? 8080 : 3000;
const baseDir = PROD ? 'build' : 'dist';

// Middleware
if (PROD) {
  app.use(compression());
} else {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: wpConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}
// 
app.use(express.static(baseDir));

// API
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressSession({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(require('connect-flash')());

//routes
app.use('/api/auth', require('./routes/authentication')(passport));
app.use('/api', require('./routes/api')(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send(err.message);
  });
}

// Client routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', baseDir, '/index.html'));
});

app.listen(port, () => {
  open(`http://localhost:${port}`);
});
