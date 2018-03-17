//create controller to use the service created
angular.module('angularfireSlackApp')
	.controller('AuthCtrl', function(Auth, $state) {//state service provide by the ui-router control state of app go method pushes users to different pages of the application
		var authCtrl = this;

		//set user object
		authCtrl.user = {
			email: '',
			password: ''
		};

		//login
		authCtrl.login = function() {
			Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (auth) {
				//redirect to home page
				$state.go('home');
			}, function(error) {
				//error handling 
				authCtrl.error = error;
			});
		};

		//registration
		authCtrl.register = function() {
			Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (user) {
				//if login succesfule ui-route redirects to home page
				$state.go('home');
			}, function(error) {
				//error handling 
				authCtrl.error = error;
			});
		};

	});
