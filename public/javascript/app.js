var app = angular.module('okaymon', ['ngRoute'])

// app.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'templates/pokemon-index.html'
//     })
//     ;
// }]);

app.controller('mainController', function($http, Pokemon) {
  var _this = this;  
  _this.getImageUrl = function(national_id) {
    return 'http://pokeapi.co/media/img/' + national_id + '.png';
  }
  Pokemon.all()
  .success(function(data) {
    _this.pokemon = data;
  });
});

app.factory('Pokemon', function PokemonFactory($http) {
  return {
    all: function() {
      return $http({ method: 'GET', url: '/api/pokemon?limit=151' });
    }
  }
});