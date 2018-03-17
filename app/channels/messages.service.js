angular.module('angularfireSlackApp')
	.factory('Messages', function($firebaseArray) {
		var channelMessagesRef = firebase.database().ref('channelMessages');

		//Return a specific channel using the channel id 
		return {
			forChannel: function(channelId) {
				return $firebaseArray(channelMessagesRef.child(channelId));
			}
		};
	});