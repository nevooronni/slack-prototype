angular.module('angularfireSlackApp')
	.factory('Messages', function($firebaseArray) {
		//reference to channelMessage node
		var channelMessagesRef = firebase.database().ref('channelMessages');
		//reference to userMessage node
		var userMessagesRef = firebase.database().ref('userMessages')

		//Return a specific channel using the channel id 
		return {
			forChannel: function(channelId) {
				return $firebaseArray(channelMessagesRef.child(channelId));
			},
			//Retrieves a direct message between two users
			forUsers: function(uid1, uid2){
    		var path = uid1 < uid2 ? uid1 + '/' + uid2 : uid2 + '/' +uid1;

    		return $firebaseArray(userMessagesRef.child(path));
  		}
		};
	});