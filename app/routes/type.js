var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.route('/type/:pokemon_type/')
  .get(function(req, res) {
    Pokemon.find({ 
      "types": {
        "$in": [
          req.params.pokemon_type
        ]
      }
    }, function(err, pokemon) {
      if (err) res.send(err);
      res.json(pokemon);
    })
  });

apiRouter.route('/type/:type_one/:type_two')
  .get(function(req, res) {
    Pokemon.find({
      "types": {
        "$all": [
          req.params.type_one,
          req.params.type_two
        ]
      }
    }, function(err, pokemon) {
      if (err) res.send(err);
      res.json(pokemon);
    })
  })

module.exports = apiRouter;