var request = require('request');
var fs = require('fs');
var pokemon = require('../pokemon-v1.json');

console.log(pokemon.length);

for (var i=600; i < 718; i++) {
  var pokemonName = pokemon[i].name.toLowerCase();
  var artUrl = pokemon[i].art_url;
  request(artUrl).pipe(fs.createWriteStream('public/images/pokemon/art/' + pokemonName + '.png'))
  console.log(pokemonName, artUrl);
}
