var express    = require('express'),
    path       = require('path'),
    app        = express(),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    mongoose   = require('mongoose'),
    favicon    = require('express-favicon'),
    request    = require('request');
    

var Pokemon          = require('./app/models/pokemon'), 
    pokemonApiRouter = require('./app/routes/pokemon.js');
    config           = require('./config.json');

var port = process.env.PORT || 8080;

mongoose.connect(
  'mongodb://brianhan:' + config.sprites_db_pw + '@ds043942.mongolab.com:43942/sprites')

// // APP CONFIG --------------------------------------------
// // use body parser so we can grab info from POST requests

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // configure our app to handle CORS requests
// // this allows requests from other domains to prevent CORS errors.
// // Any domain has access to our API

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
//   next();
// });

app.use(favicon(__dirname + '/app/public/images/favicon.ico'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/app/public'));

// log all requests to the console

app.use(morgan('dev'));

app.use('/api', pokemonApiRouter);
app.get('*', function(req, res) {
  res.sendFile('./app/public/index.html');
});

app.listen(port);
console.log('Magic happens on port ' + port);
