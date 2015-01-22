Meteor.startup(function() {
  // Cordova pushplugin
  var pushNotification = window.plugins.pushNotification;


  function tokenSuccessHandler(result) {
    console.log('token success result ' + result);
    window.localStorage.setItem('deviceToken', result);
    // API call to store token on your DB
    Meteor.call('savePushTokens', result)
    console.log(Tokens.find().fetch());
  }

  function successHandler(result) {
    console.log('success result ' + result);
    // API call to store token on your DB
    Meteor.call('savePushTokens', result, function(error, result) {
    if (error) {
      console.log("error when calling method")
      console.log(error);
    }
    else {
      console.log("Succesful method call")
      console.log(result);
    }
    });
    console.log(Tokens.find().fetch());
  }

  function errorHandler(error) {
    console.log('error result ' + error);
  }

  function onNotificationAPN(e) {
    console.log('Inside the onNotificationAPN callback!');
    if ( e.alert ) {
      navigator.notification.alert(e.alert);
    }

    if ( e.sound ) {
      var snd = new Media(e.sound);
      snd.play();
    }

    if ( e.badge ) {
      pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, e.badge);
    }
  }

  window.onNotificationAPN = onNotificationAPN;

  pushNotification.register(
    tokenSuccessHandler,
    errorHandler, {
      'badge':'true',
      'sound':'true',
      'alert':'true',
      'ecb':'onNotificationAPN'
    }
  );
});