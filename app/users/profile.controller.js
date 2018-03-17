angular.module('angularfireSlackApp')
	.controller('ProfileCtrl', function($state, md5, auth, profile) {
		var profileCtrl = this;

		//set profile to the one that was resolved by the router
		profileCtrl.profile = profile;

		profileCtrl.updateProfile = function() {
			profileCtrl.profile.emailHash = md5.createHash(auth.email);
			profileCtrl.profile.$save();
		};
	});