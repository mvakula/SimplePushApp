Meteor.methods({
  savePushTokens: function(myToken) {
  	console.log("Saving the token.")
	Tokens.insert({token: myToken}, function(error, result) {
		if (error) {
			console.log(error);
		}
		else {
			console.log(result);
		}
	});
	console.log("Token is now saved!");
  }
})