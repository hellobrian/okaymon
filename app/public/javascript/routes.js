angular.module('Okaymon')
.config(function($routeProvider){
  
  $routeProvider
  .when('/', {
    templateUrl: '../templates/pokemon/index.html'
  })
  .when('/pokemon', {
    templateUrl: '../templates/pokemon/index.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});