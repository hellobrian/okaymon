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
  types: [String],
  image_url: String
});

// return the model
module.exports = mongoose.model('Pokemon', PokemonSchema);