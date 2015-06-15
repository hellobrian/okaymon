angular.module('okaymon', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/pokemon-index.html'
    })
    ;
});