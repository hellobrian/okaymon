var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = new Schema({
  national_id: Number,
  pkdx_id: Number,
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  evolutions: [
    {
      level: Number,
      method: String,
      to: String
    }
  ], 
  types: [{ name: String }],
  sprites: [
    {
      name: String,
      resource_uri: String 
    }
  ], 
  resource_uri: String
});

// return the model
module.exports = mongoose.model('Pokemon', PokemonSchema);