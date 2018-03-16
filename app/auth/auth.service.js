angular.module('angularfireSlackApp')
	.factory('Auth', function($firebaseAuth) {//inject the constant we just created in the app.js file
		//initialize app to use firebase
		var auth = $firebaseAuth();
		
		return auth;//now auth service is ready for our application to use it.
	});

