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
    
    function nextPokemonUrl(pokemonBody) {
      var url = 'http://okaymon.mybluemix.net/api/pokemon/';
      var id = pokemonBody[0].national_id;

      if (id === 718) {
        return null;
      } else {
        return url + (id + 1);
      }
    }
    _body[0].next_pokemon = nextPokemonUrl(_body);
    console.log(_body[0]);
    // console.log(nextPokemonUrl(_body));
    nextPokemonUrl(_body)
    res.render('pokemon', { 
      layout: 'pokemon-template', 
      pokemon: _body
    });
  });
});

module.exports = pageRouter;