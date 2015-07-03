var express = require('express'),
    pageRouter = express.Router(),
    request = require('request');

pageRouter.route('/').get(function (req, res) {
  res.render('index', {layout: 'main-template'});    
});

pageRouter.route('/pokemon').get(function (req, res) {
  request('http://okaymon.mybluemix.net/api/pokemon/1', function(error, response, body) {
    var _body = JSON.parse(body);
    res.render('pokemon', {layout: 'pokemon-template', pokemon: _body[0] });  
  });
});

pageRouter.route('/pokemon/:id').get(function (req, res) {
  var url = 'http://okaymon.mybluemix.net/api/pokemon/' + req.params.id;
  console.log(url);
  request(url, function (error, response, body) {
    var _body = JSON.parse(body);
    console.log(_body);
    res.render('pokemon', {
      layout: 'pokemon-template', pokemon: _body
    });
  });
});

module.exports = pageRouter;