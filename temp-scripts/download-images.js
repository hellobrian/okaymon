var request = require('request');
var fs = require('fs');

for (var i=151; i < 152; i++) {
  var image_url = "http://pokeapi.co/media/img/" + i + ".png";
  var filename = i + ".png";
  request(image_url).pipe(fs.createWriteStream("public/images/pokemon/generation-1/" + filename));
}