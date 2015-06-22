# Okaymon

Okaymon is a web app for pokemon -- a directory that tells you when they evolve and how they evolve. 

## API

This API is based on [pokeapi.co](http://pokeapi.co/), the open-source API by Paul Hallett ([Phalt on GitHub](https://github.com/phalt)). 

### Why not use pokeapi? 

The reason why I created my own API is because I only needed a subset of the data that pokeapi provides. 
I also wanted to re-structure the data and endpoints to create a simpler API I could work with in my own projects. 
For example, I wanted the urls for my API endpoints to be as descriptive as possible, that means including named parameters where it makes sense. 

GET /api/pokemon/charmander will return data for Charmander. 
GET /api/type/fire will return data for all fire type pokemon. 

### GET /pokemon

- [/api/pokemon](http://okaymon.mybluemix.net/api/pokemon)
Returns an array of all pokemon. There are 718 pokemon in this API. 

- [/api/pokemon?limit=2](http://okaymon.mybluemix.net/api/pokemon?limit=2)
Limits the number of pokemon results to an array length of 2.

- [/api/pokemon/1](http://okaymon.mybluemix.net/api/pokemon/1)
Returns a pokemon object with the national_id of 1.

- [/api/pokemon/mewtwo](http://okaymon.mybluemix.net/api/pokemon/mewtwo)
Returns a pokemon by name.

### GET /generation

- [/api/generation/1](http://okaymon.mybluemix.net/api/generation/1)
Returns the first 151 pokemon according to national_id.
There are 6 generations of pokemon. 

### GET /type

- [/api/type/fire](http://okaymon.mybluemix.net/api/type/fire)
Returns all fire type pokemon.

- [/api/type/fire/ice](http://okaymon.mybluemix.net/api/type/fire/ice)
Returns all pokemon that are fire and ice types.