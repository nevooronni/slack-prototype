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
        templateUrl: 'auth/login.html',
        resolve: {
          requiredNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requiredNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireSignIn().catch(function() {
              $state.go('home');
            });
          },
          profile: function(Users, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

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