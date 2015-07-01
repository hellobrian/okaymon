var express = require('express'),
    pageRouter = express.Router(),
    request = require('request');

pageRouter.route('/').get(function (req, res) {
  var apiUrl = 'http://okaymon.mybluemix.net/api/'
  var pokemon1 = apiUrl + 'pokemon/1'
  request(pokemon1, function(request, response, body) {
    var pokemon = JSON.parse(body);
    res.render('index', {layout: 'main-template', pokemon: pokemon });    
  })
});

module.exports = pageRouter;