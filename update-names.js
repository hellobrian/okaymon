var request = require('request'),
    cheerio = require('cheerio'),
    Pokemon = require('./pokemon-v1.json');

// get description text 
function getDescriptionText(pokedex_url, national_id) {
  request(pokedex_url, function(error, response, body) {
    var $ = cheerio.load(body, {
      normalizeWhitespace: true,
      decodeEntities: true,
      recognizeCDATA: true
    });
    var descriptionText = $('.version-descriptions .active').text().trim();
    var updateDescriptionUrl = 'http://localhost:8080/api/pokemon/' + national_id;
    updateDescription(updateDescriptionUrl, descriptionText)
  });
}

// use description text to update api
function updateDescription(okaymon_url, text) {
  request({
    url: okaymon_url,
    method: 'PUT',
    json: {
      description: text
    }
  });
}

// repeat for every number of pokemon in pokemon-v1.json
for (var i=0; i<3; i++) {
  var national_id = Pokemon[i].national_id;
  var pokedex_description_url = 'http://www.pokemon.com/us/pokedex/' + national_id;
  getDescriptionText(pokedex_description_url, national_id);
}











// var getDescriptionText = function(url, update_url) {
//   var updateUrl =  update_url;
//   request(url, function (error, response, body) {
//     var $ = cheerio.load(body, {
//       normalizeWhitespace: true,
//       decodeEntities: true,
//       recognizeCDATA: true
//     });
//     var descriptionText = $('.version-descriptions .active').text().trim();
//     request({
//       url: updateUrl,
//       method: 'PUT',
//       json: {
//         description: descriptionText
//       }
//     })
//   });
// }

// for (var i=0; i < 3; i++) {
//   var description_url = 'http://www.pokemon.com/us/pokedex/' + i;
//   var update_url = 'http://localhost:8080/api/pokemon/' + i;
//   getDescriptionText(description_url, update_url);
// }