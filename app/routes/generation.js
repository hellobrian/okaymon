var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

apiRouter.route('/generation/:gen_number')
  .get(function(req, res) {

    var typeOne = req.query.type;
    var typeTwo = req.query.type2;

    var queryTwoTypes = function(query1, query2, gt_id, lte_id) {
      return Pokemon.find({ 
        "$and": [
          { "types": {"$all": [ query1, query2 ]}},
          { "$and": [
            {"national_id": {"$gt": gt_id}},
            {"national_id": {"$lte": lte_id}}
          ]}
        ]
      }).sort({"national_id": 1})
    };

    var queryType = function(query, gt_id, lte_id) {
      return Pokemon.find({ 
        "$and": [
          { "types": {"$in": [ query ]}}, 
          { "$and": [
            {"national_id": {"$gt": gt_id}},
            {"national_id": {"$lte": lte_id}}
          ]}
        ]
        }).sort({ "national_id": 1 });
    }

    var query = function() {
      return Pokemon.find().sort({ "national_id": 1 })
    };

    switch(req.params.gen_number) {

      case "1": 
        if (typeOne && typeTwo) {
          queryTwoTypes(typeOne, typeTwo, 0, 151).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else if (typeOne) {
          queryType(typeOne, 0, 151).exec(function(err, pokemon) {
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
        if (typeOne && typeTwo) {
          queryTwoTypes( typeOne, typeTwo, 151, 251).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        } else if (typeOne) {
          queryType( typeOne, 151, 251).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else {
          query().skip(151).limit(100).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        }
        break;

      case "3":
        if (typeOne && typeTwo) {
          queryTwoTypes( typeOne, typeTwo, 251, 386).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        } else if (typeOne) {
          queryType( typeOne, 251, 386).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else {
          query().skip(251).limit(135).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        }
        break;

      case "4":
        if (typeOne && typeTwo) {
          queryTwoTypes( typeOne, typeTwo, 386, 493).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        } else if (typeOne) {
          queryType( typeOne, 386, 493).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else {
          query().skip(386).limit(107).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        }
        break;

      case "5":
        if (typeOne && typeTwo) {
          queryTwoTypes( typeOne, typeTwo, 493, 649).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        } else if (typeOne) {
          queryType( typeOne, 493, 649).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else {
          query().skip(493).limit(156).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        }
        break;

      case "6":
        if (typeTwo && typeOne) {
          queryTwoTypes( typeOne, typeTwo, 649, 718).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        } else if (typeOne) {
          queryType( typeOne, 649, 718).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          })
        } else {
          query().skip(659).limit(69).exec(function(err, pokemon) {
            if (err) res.send(err);
            res.json(pokemon);
          });
        }
        break;

      default: 
        res.json({
          "params_error": req.params.gen_number + " is not a generation of pokemon.",
          "query_strings": req.query
        });
    }
  });

module.exports = apiRouter;