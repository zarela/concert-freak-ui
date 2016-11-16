(function() {
  angular.module('concert', ['ui.router'])
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'home.html'
    })
    .state('login', {
      url:'/login',
      templateUrl: 'login.html'
    })
    .state('user', {
      url:'/user',
      templateUrl: 'user.html'
    })

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

  } //end
})()
console.log("Controller wired")
