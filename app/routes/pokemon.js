var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
  res.redirect('/api/pokemon');
});

apiRouter.route('/pokemon')
  .get(function(req, res) {

    var sortedPokemon = Pokemon.find().sort({ "national_id": 1 });

    // Limit number of pokemon in response by national_id (1 to n).
    if (req.query.limit >= 0) {
      sortedPokemon
        .limit(req.query.limit)
        .exec(function(err, pokemon) {
          res.json(pokemon);
      });
    } 

    // Return all pokemon.
    else {
      sortedPokemon
        .exec(function(err, pokemon) {
          res.json(pokemon);
      });
    }
  });

apiRouter.route('/pokemon/:name_or_id')
  .get(function(req, res) {

    var isNumber = isNumeric(req.params.name_or_id);
    var param = req.params.name_or_id;

    switch(isNumber) {
      case true:
      // FIND A POKEMON by NATIONAL_ID
        Pokemon.find({ "national_id": param }, function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case false: 
      // FIND A POKEMON by NAME
        Pokemon.find({ "name": param.toLowerCase().capitalize() }, function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;
    }
  })
  .put(function(req, res) {
    var isNumber = isNumeric(req.params.name_or_id);
    var param = req.params.name_or_id;
    // var pokemonName = req.params.name_or_id;

    switch(isNumber) {
      case true: 
        Pokemon.find({"national_id": param}, function (err, pokemon) {
          if (err) res.send(err);
          if (req.body.art_url) pokemon[0].art_url = req.body.art_url;
          if (req.body.name) pokemon[0].name = req.body.name;
          if (req.body.description) pokemon[0].description = req.body.description;
          pokemon[0].save(function (err) {
            if (err) res.send(err);
            res.json(pokemon);            
          })
        });
        break;

      case false: 
        Pokemon.find({"name": param}, function(err, pokemon) {
          if (err) res.send(err);
          if (req.body.art_url) pokemon[0].art_url = req.body.art_url;
          if (req.body.name) pokemon[0].name = req.body.name;
          if (req.body.description) pokemon[0].description = req.body.description;
          // if (req.body.types) pokemon[0].types = req.body.types;
          // if (req.body.image_url) pokemon[0].image_url = req.body.image_url;
          pokemon[0].save(function(err) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        });
        break;
    }
  });

function isNumeric(input) {
  // source: http://stackoverflow.com/a/174921
  return (input - 0) == input && ('' + input).trim().length > 0;
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = apiRouter;