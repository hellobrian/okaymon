var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('http://www.pokemon.com/us/pokedex/psyduck', function(error, response, body) {
  var requestPath = response.client._httpMessage.path;
  var $ = cheerio.load(body, {
    normalizeWhitespace: true,
    decodeEntities: true,
    recognizeCDATA: true
  });
  var html = $('.version-descriptions').children().html();
  // request({
  //   url: 'http://localhost:8080'
  // })
  // Form JSON with description
  // PUT request on pokemon/:pokemon_name
})
