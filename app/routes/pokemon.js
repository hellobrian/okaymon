var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
  res.redirect('/api/pokemon');
});

apiRouter.route('/pokemon')
  .get(function(req, res) {
    // Limit number of pokemon in response by national_id (1 to n).
    if (req.query.limit >= 0) {
      Pokemon
        .find()
        .sort({ "national_id": 1 })
        .limit(req.query.limit)
        .exec(function(err, pokemon) {
          res.json(pokemon);
      });
    } 
    // Find a pokemon by national_id. 
    else if (req.query.id >= 0) {
      Pokemon.find({"national_id": req.query.id}, function(err, pokemon) {
        res.json(pokemon);
      });
    } 
    // Find a pokemon by type
    else if (req.query.type) {
      Pokemon.find({ 
        "types": {
          "$elemMatch": {
            "name": req.query.type
          }
        }
      }, function(err, pokemon) {
        res.json(pokemon);
      })
    } 
    // Return all pokemon.
    else {
      Pokemon
        .find()
        .sort({ "national_id": 1 })
        .exec(function(err, pokemon) {
          res.json(pokemon);
      });
    }
  });

apiRouter.route('/pokemon/:pokemon_name')
  .get(function(req, res) {
    var pokemonName = req.params.pokemon_name;
    Pokemon.find({"name": pokemonName.toLowerCase().capitalize()}, function(err, pokemon) {
      if (err) res.send(err);
      res.json(pokemon);
    })
  });

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = apiRouter;