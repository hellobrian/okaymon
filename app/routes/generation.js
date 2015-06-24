var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.route('/generation/:gen_number')
  .get(function(req, res) {

    var typeOne = req.query.type1 || req.query.type;
    var typeTwo = req.query.type2;

    var queryTwoTypes = function(query1, query2, id) {
      return Pokemon.find({ "$and": 
        [
          { "types": {"$all": [ query1, query2 ]}},
          { "national_id": {"$lte": id }}
        ]
      }).sort({"national_id": 1})
    };

    var queryType = function(query, id) {
      return Pokemon.find({ "$and": 
        [
          { "types": {"$in": [ query ]}}, 
          { "national_id": { "$lte": id }}
        ]
        }).sort({ "national_id": 1 });
    }

    var query = function() {
      return Pokemon.find().sort({ "national_id": 1 })
    };

    switch(req.params.gen_number) {

      case "1": 
        if (typeOne && typeTwo) {
          queryTwoTypes( typeOne, typeTwo, 151).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else if (typeOne) {
          queryType( typeOne, 151).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else {
          query().limit(151).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        }
        break;

      case "2": 
        query().skip(151).limit(100).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "3":
        query().skip(251).limit(135).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "4":
        query().skip(386).limit(107).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "5":
        query().skip(493).limit(156).exec(function(err, pokemon) {
          if (err) res.send(err);
          res.json(pokemon);
        });
        break;

      case "6":
        query().skip(659).limit(69).exec(function(err, pokemon) {
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