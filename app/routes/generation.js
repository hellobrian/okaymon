var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.route('/generation/:gen_number')
  .get(function(req, res) {

    var sortedPokemon = Pokemon.find().sort({ "national_id": 1 });

    switch(req.params.gen_number) {

      case "1": 
        sortedPokemon.limit(151).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "2": 
        sortedPokemon.skip(151).limit(100).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "3":
        sortedPokemon.skip(251).limit(135).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "4":
        sortedPokemon.skip(386).limit(107).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "5":
        sortedPokemon.skip(493).limit(156).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "6":
        sortedPokemon.skip(659).limit(69).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      default: 
        res.json({
          "message": req.params.gen_number + " is not a generation of pokemon."
        });
    }
  });

module.exports = apiRouter;