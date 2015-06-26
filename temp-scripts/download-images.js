var request = require('request');
var fs = require('fs');
var pokemon = require('../pokemon.json');

for (var i=0; i<10; i++) {
  var pokemonName = pokemon[i].name.toLowerCase();
  var okaymonArtUrl = 'http://localhost:8080/api/pokemon/' + pokemonName;

  request(okaymonArtUrl, function(error, response, body) {
    var _body = JSON.parse(body);
    var thisPokemonFileName = _body[0].name.toLowerCase() + '.png';
    var actualArtUrl = _body[0].art_url;
    downloadImages(actualArtUrl, "public/images/pokemon/pokedex-art/", thisPokemonFileName);
    console.log(thisPokemonFileName);
  });
}

function downloadImages(url, directoy, fileName) {
  var fullPath = directoy + fileName;
  request(url).pipe(fs.createWriteStream(fullPath));
}

// for (var i=501; i <= 718; i++) {
//   var k = i - 1;
//   var name = pokemon[k].name.toLowerCase() + ".png"; 
//   console.log(name); 
//   request("http://pokeapi.co/media/img/" + i + ".png").pipe(fs.createWriteStream("public/images/pokemon/" + name));
// }

// for (var i=1; i < 10; i++) {
//   var image_url = "http://pokeapi.co/media/img/" + i + ".png";
//   request(image_url).pipe(fs.createWriteStream("public/images/pokemon/" + JSON.parse(body)[0].name.toLowerCase() + ".png"));
//   })
// }