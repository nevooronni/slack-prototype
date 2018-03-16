'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html'
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function(){
    var config = {
      apiKey: "AIzaSyC2puDl6qqCMC0jWBaMNCvDFz1rFUTDL5I",
      authDomain: "slack-prototype.firebaseapp.com",
      databaseURL: "https://slack-prototype.firebaseio.com",
      projectId: "slack-prototype",
      storageBucket: "slack-prototype.appspot.com",
      messagingSenderId: "306588471334"
    };
    firebase.initializeApp(config);
  })