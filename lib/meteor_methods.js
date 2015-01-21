Meteor.methods({
  savePushTokens: function(myToken) {
    Tokens.insert({token: myToken});
    console.log(myToken);
  }
})