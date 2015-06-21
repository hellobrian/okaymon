var express   = require('express'),
    Pokemon   = require('../models/pokemon.js'),
    apiRouter = express.Router();

// apiRouter.route('/type/:type_one/:type_two')
//   .get(function(req, res) {
//     if (req.params.type_one && req.params.type_two) {
//       Pokemon.aggregate([{
//         "$match": {
//           "name": req.params.type_one
//         }
//       }], function(err, pokemon) {
//         if (err) res.send(pokemon);
//         res.json(pokemon);
//       })
//     }
//   });

// apiRouter.route('/type/:type_one')
//   .get(function(req, res) {
//     Pokemon.find({
//       "types": {
//         "$elemMatch": { "name": req.params.type_one }
//       }
//     }, function(err, pokemon) {
//       if (err) res.send(pokemon);
//       res.json(pokemon);
//     })
//   });

module.exports = apiRouter;