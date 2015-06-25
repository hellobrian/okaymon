var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = new Schema({
  national_id: Number,
  pkdx_id: Number,
  description: {
    type: String,
    trim: true
  },
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
  types: [String],
  image_url: String,
  art_url: String
});

// return the model
module.exports = mongoose.model('Pokemon', PokemonSchema);