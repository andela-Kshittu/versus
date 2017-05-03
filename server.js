// Imports
const compression = require('compression');
const wpConfig = require('./webpack.config');
const express = require('express');
const open = require('open');
const path = require('path');
const webpack = require('webpack');

//sever imports
const config = require('./config/config');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var expressSession = require('express-session');

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
// app.set('views', path.join(__dirname, './', baseDir,'views'));
// app.set('view engine', 'html');

// API

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
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

/// catch 404 and forward to error handler
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
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    });
}

// Client routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './', baseDir, '/index.html'));
});

app.listen(port, () => {
    open(`http://localhost:${port}`);
});