var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var swig = require('swig');
require('./filters')(swig);

// import routes
var router = require('./routes');
var wikiRouter = require('./routes/wiki');
var userRouter = require('./routes/user');
var searchRouter = require('./routes/search');

// instantiate the app
var app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'html');

app.engine('html', swig.renderFile);

swig.setDefaults({cache: false});

// use public for static routing
app.use(express.static(__dirname + '/public'));

// parse POST bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// logging middleware
app.use(morgan('dev'));

// use the imported routes
app.use('/', router);
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);

app.listen(3000);