var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.route('/generation/:generation')
  .get(function(req, res) {

    function pokemonQuery() {
      return Pokemon.find().sort({ "national_id": 1 });
    }

    if (req.params.generation === "1") {
      pokemonQuery().limit(151).exec(function(err, pokemon) {
        if (err) res.send(err);
        res.json(pokemon);
      });
    }
    else if (req.params.generation === "2") {
      pokemonQuery().skip(151).limit(100).exec(function(err, pokemon) {
        if (err) res.send(err);
        res.json(pokemon);
      });
    }
    else if (req.params.generation === "3") {
      pokemonQuery().skip(251).limit(135).exec(function(err, pokemon) {
        if (err) res.send(err);
        res.json(pokemon);
      });
    }
    else if (req.params.generation === "4") {
      pokemonQuery().skip(386).limit(107).exec(function(err, pokemon) {
        if (err) res.send(err);
        res.json(pokemon);
      });
    }
    else if (req.params.generation === "5") {
      pokemonQuery().skip(493).limit(156).exec(function(err, pokemon) {
        if (err) res.send(err);
        res.json(pokemon);
      });
    }
    else if (req.params.generation === "6") {
      pokemonQuery().skip(659).limit(69).exec(function(err, pokemon) {
        if (err) res.send(err);
        res.json(pokemon);
      });
    }
  });

module.exports = apiRouter;