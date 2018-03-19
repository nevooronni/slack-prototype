//purpose of this factory is to provide us with the ability to get either a specific user's data or to get a list of all our users
//authenticated data is accessible to us we have to store this data manually
//data in firebase stored in a tree structure can be referenced by passing a string to the ref() function
angular.module('angularfireSlackApp')
	.factory('Users', function($firebaseArray, $firebaseObject) {
		//firebase reference to db
		var usersRef = firebase.database().ref('users');

		//provides methods to manipulate data on firebase
		var users = $firebaseArray(usersRef);

		//reference to special .info/connected node on firebase
		var connectedRef = firebase.database().ref('.info/connected');

		
		var Users = {
			getProfile: function(uid) {
				return $firebaseObject(usersRef.child(uid));
			},
			getDisplayName: function(uid) {
				return users.$getRecord(uid).displayName;
			},
			//return the url to user's gravatar image when provided with a uid
			getGravatar: function(uid) {
				var emailHash = users.$getRecord(uid) ? users.$getRecord(uid).emailHash : ''
				return '//www.gravatar.com/avatar' + emailHash;
			}, 
			//function for our users service
			setOnline: function (uid) {
				var connected = $firebaseObject(connectedRef);
				var online = $firebaseArray(usersRef.child(uid+'/online'));

				//watched for changes in the .info/connected node and will add any open connection to a firebasearray keyed under online within the user's profile
				//allows us to track multiple connections
				connected.$watch(function () {
					if(connected.$value === true) {
						online.$add(true).then(function(connectedRef) {
							connectedRef.onDisconnect().remove();
						});
					}
				});
			},
			all: users
		};

		return Users;
	});