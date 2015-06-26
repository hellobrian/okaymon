var request = require('request');
var cheerio = require('cheerio');
var pokemon = require('../pokemon.json');
var fs = require('fs');

for (var i=0; i < pokemon.length; i++) {
  var array_name = pokemon[i].name.split('-');
  if (array_name.length > 1) {
    // console.log(array_name.join("-"));
    if (array_name.join("-") === "Nidoran-f" ||
        array_name.join("-") === "Nidoran-m" ||
        array_name.join("-") === "Mr-mime" ||
        array_name.join("-") === "Ho-oh" ||
        array_name.join("-") === "Mime-jr" ||
        array_name.join("-") === "Porygon-z") {
      i++;
    } else {
      console.log(array_name.join("-"));
    }
  } 
}

// [ 'Nidoran', 'f' ]
// [ 'Nidoran', 'm' ]
// [ 'Mr', 'mime' ]
// [ 'Ho', 'oh' ]
// [ 'Mime', 'jr' ]
// [ 'Porygon', 'z' ]