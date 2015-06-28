var request = require('request');
var fs = require('fs');
var open = require('open');

var allPokemonUrl = 'http://localhost:8080/api/pokemon';

function requestUrl(url) {
  request(url, function(error, response, body) {
    lowercaseNames(body, 550, 718);
  });
}

function lowercaseNames(body, firstNumber, lastNumber) {
  for (var i=firstNumber; i < lastNumber; i++) {
    
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


requestUrl(allPokemonUrl);
