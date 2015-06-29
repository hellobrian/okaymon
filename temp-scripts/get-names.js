var request = require('request');
var fs = require('fs');

var allPokemonUrl = 'http://localhost:8080/api/pokemon';

function updateNames(url) {
  request(url, function(error, response, body) {
    lowercaseNames(body, 550, 718);
  });
}

function lowercaseNames(body, startingId, endingId) {
  for (var i=startingId; i < endingId; i++) {
    
    var _body = JSON.parse(body);
    var pokemonUrl = allPokemonUrl + '/' + _body[i].national_id;

    request({
      url: pokemonUrl,
      method: 'PUT',
      json: {
        name: _body[i].name.toLowerCase()
      }
    });
  }
}


updateNames(allPokemonUrl);
