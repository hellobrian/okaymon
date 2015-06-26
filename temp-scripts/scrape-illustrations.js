var request = require('request');
var cheerio = require('cheerio');
var pokemon = require('../pokemon.json');
var fs = require('fs');

for (var i=0; i < 10; i++) {
  var name = pokemon[i].name;
  var url = 'http://www.pokemon.com/us/pokedex/' + name;

  request(url, function(error, response, body) {
    var requestPath = response.client._httpMessage.path;
    var pokemonName = requestPath.split('/').slice(3,4).toString();
    console.log(pokemonName);
    var $ = cheerio.load(body, {
      normalizeWhitespace: true,
      decodeEntities: true,
      recognizeCDATA: true
    });
    var imgSrc = $('.profile-images').children().attr("src");
    var artUrl = 'http:' + imgSrc;
    updateWithArt(artUrl, pokemonName);
  });
}

function updateWithArt(art_url, name) {
  var url = "http://localhost:8080/api/pokemon/" + name;
  var artObject = {
    art_url: art_url
  }
  request({
    url: url,
    method: 'PUT',
    json: artObject
  });
}

// // Source: http://stackoverflow.com/a/4339083/2058360
// String.prototype.decodeHTML = function() {
//   var map = {"gt":">" /* , … */};
//   return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
//       if ($1[0] === "#") {
//         return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
//       } else {
//         return map.hasOwnProperty($1) ? map[$1] : $0;
//       }
//   });
// };