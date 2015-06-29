var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    compression = require('compression'),
    cons        = require('consolidate'),
    dustjs      = require('dustjs-linkedin'),
    favicon     = require('express-favicon'),
    mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    path        = require('path'),
    request     = require('request');

    
// Models
var Pokemon = require('./app/models/pokemon');

// Config
var config = require('./config.json'),
    port   = process.env.PORT || 8080;

mongoose.connect(
  'mongodb://brianhan:' + config.sprites_db_pw + '@ds043942.mongolab.com:43942/sprites')

// // APP CONFIG --------------------------------------------
// // use body parser so we can grab info from POST requests

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
// this allows requests from other domains to prevent CORS errors.
// Any domain has access to our API

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(compression());
app.use(favicon('public/images/favicon.ico'));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', cons.dust);
app.set('view engine', 'dust');

// log all requests to the console
if (app.get('env') === 'development') {
  app.use(morgan('dev')); 
};
  
app.use('/api', require('./app/routes/api/pokemon.js'));
app.use('/api', require('./app/routes/api/generation.js'));
app.use('/api', require('./app/routes/api/type.js'));
app.use('/',    require('./app/routes/site/pages.js'));

app.listen(port);
console.log('http://localhost:' + port);
