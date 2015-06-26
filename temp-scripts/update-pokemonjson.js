var fs = require('fs');
var request = require('request');

request('http://okaymon.mybluemix.net/api/pokemon').pipe(fs.createWriteStream('pokemon-v1.json'));