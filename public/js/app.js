(function() {
  angular.module('concert', ['ui.router'])
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('home', {
      url:'/',
      templateUrl: '/partials/home.html'
    })
    .state('login', {
      url:'/login',
      templateUrl: '/partials/login.html'
    })
    .state('signup', {
      url:'/signup',
      templateUrl: '/partials/signup.html'
    })
    .state('user', {
      url:'/user',
      templateUrl: '/partials/user.html'
    })
    .state('events', {
      url:'/events',
      templateUrl: '/partials/events.html'
    })
    .state('new', {
      url:'/new',
      templateUrl: '/partials/new.html'
    })

    // $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

  } //end
})()
console.log("Router Wired")
