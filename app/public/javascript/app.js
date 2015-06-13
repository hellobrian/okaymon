angular.module('Okaymon', ['ngRoute']);


// ROUTES

angular.module('Okaymon')
.config(function($routeProvider, $locationProvider){
  
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

  $locationProvider.html5mode(true);

});