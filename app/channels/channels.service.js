angular.module('angularfireSlackApp')
	.factory('Channels', function($firebaseArray) {
		//references channel nodes in db
		var ref = firebase.database().ref('channels');

		//get all channels
		var channels = $firebaseArray(ref);

		return channels;
	});