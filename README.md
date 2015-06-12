# Okaymon

Okaymon is a web app for pokemon -- a directory that tells you when they evolve and how they evolve. 

## API

### GET Requests

- #### [/api/pokemon](http://okaymon.mybluemix.net/api/pokemon)
Returns an array of all pokemon. There are 718 pokemon in this API. 

- #### [/api/pokemon?limit=2](http://okaymon.mybluemix.net/api/pokemon?limit=2)
Limits the number of pokemon results to an array length of 2.

- #### [/api/pokemon?id=1](http://okaymon.mybluemix.net/api/pokemon?id=1)
Returns a pokemon object with the national_id of 1.

- #### [/api/pokemon?type=fire](http://okaymon.mybluemix.net/api/pokemon?type=fire)
Returns a pokemon with a type of fire.

- #### [/api/pokemon/mewtwo](http://okaymon.mybluemix.net/api/pokemon/mewtwo)
Returns a pokemon by name.