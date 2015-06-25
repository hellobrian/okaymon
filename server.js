var express     = require('express'),
    path        = require('path'),
    app         = express(),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    favicon     = require('express-favicon'),
    compression = require('compression'),
    dustjs      = require('dustjs-linkedin'),
    cons        = require('consolidate'),
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
  
app.use('/api', require('./app/routes/pokemon.js'));
app.use('/api', require('./app/routes/generation.js'));
app.use('/api', require('./app/routes/type.js'));

app.get('/', function(req, res) {
  var apiUrl = 'http://okaymon.mybluemix.net/api/'
  var generation1 = apiUrl + 'generation/1';
  request(generation1, function(request, response, body) {
    var pokemon = JSON.parse(body);
    res.render('index', {layout: 'main-template', pokemon: pokemon });    
  })
  
})

app.listen(port);
console.log('http://localhost:' + port);
