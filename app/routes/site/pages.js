var express = require('express'),
    pageRouter = express.Router(),
    request = require('request');

pageRouter.route('/').get(function (req, res) {
  res.render('index', {layout: 'main-template'});    
});

pageRouter.route('/pokemon').get(function (req, res) {
  res.redirect('/pokemon/1');
});

pageRouter.route('/pokemon/:name_or_id').get(function (req, res) {
  var url = 'http://okaymon.mybluemix.net/api/pokemon/' + req.params.name_or_id;
  
  request(url, function (error, response, body) {
    var _body = JSON.parse(body);
    res.render('pokemon', { 
      layout: 'pokemon-template', 
      pokemon: _body
    });
  });
});

module.exports = pageRouter;