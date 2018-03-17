angular.module('angularfireSlackApp')
	//profile we are injecting comes from the parent state channels
	.controller('MessagesCtrl', function(profile, channelName, messages) {
		var messagesCtrl = this;

		//set messages and channelName on messageCtrl
		messagesCtrl.messages = messages;
		messagesCtrl.channelName = channelName;

		//new message
		messagesCtrl.message = '';

		//add message to db(messages)
		messagesCtrl.sendMessage = function () {
			if(messagesCtrl.message.length > 0) {
				messagesCtrl.messages.$add({
					uid: profile.$id,
					body: messagesCtrl.message,
					timestamp: firebase.database.ServerValue.TIMESTAMP
				}).then(function() {
					messagesCtrl.message = '';
				});
			}
		};
	});