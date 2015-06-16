var app = angular.module('okaymon', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/pokemon-index.html'
    })
    ;
}]);

app.controller('mainController', function($http, Pokemon) {
  var _this = this;
  _this.message = 'ima main controller';
  
  Pokemon.all()
  .success(function(data) {
    _this.pokemon = data;
  });
});

app.factory('Pokemon', function PokemonFactory($http) {
  return {
    all: function() {
      return $http({ method: 'GET', url: '/api/pokemon' });
    }
  }
})