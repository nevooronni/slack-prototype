angular.module('angularfireSlackApp')
	.controller('ChannelsCtrl', function($state, Auth, Users, profile, channels) {
		var channelsCtrl = this;

		//set channels and profile to resolve dependencies from the router 
		channelsCtrl.profile = profile;
		channelsCtrl.channels = channels;

		//set getDisplayName and getGravatar to the respective functions on the Users service
		channelsCtrl.getDisplayName = Users.getDisplayName;
		channelsCtrl.getGravatar = Users.getGravatar;

		//set users on channelCtrl 
		channelsCtrl.users = Users.all;

		//logout function for logout and return to home state
		channelsCtrl.logout = function() {
			Auth.$signOut().then(function() {
				$state.go('home');
			});
		};

		//newChannel object with blank name
		channelsCtrl.newChannel = {
			name: ''
		}

		channelsCtrl.createChannel = function() {
			channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(ref) {
				$state.go('channels.messages', {channelId: ref.key});
				//clears channel object one it has been added to firebase db
				channelsCtrl.newChannel = {
					name: ''
				};
			});
		};
	});