var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.route('/type/:pokemon_type/')
  .get(function(req, res) {
    console.log(req.params);
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

module.exports = apiRouter;