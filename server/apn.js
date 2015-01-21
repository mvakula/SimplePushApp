var apn = Meteor.npmRequire("apn"),
    path = Npm.require('path'),
    apnOptions = Meteor.settings.apnOptions || {},
    apnConnection

// default apn connection options
var appRootPath = "/Users/Mika/Devaus/meteor/myapp/"
apnOptions = _.extend({
  cert: path.join(appRootPath, "private", "apnDevCert.pem"),
  key: path.join(appRootPath, "private", "apnDevKey.pem"),
  passphrase: "devdev",
}, apnOptions)
apnConnection = new apn.Connection(apnOptions)

Meteor.methods({
    sendPush: function() {
        var token = "077f2ea72eb6b2dfc381ce27f2eb12e2ee8ee68f7eeb90f7f2f10f1d99cd140e"
        var apn = Meteor.npmRequire("apn")
        var note = new apn.Notification()
        var myDevice = new apn.Device(token);

        // expires 1 hour from now
        note.expiry = Math.floor(Date.now() / 1000) + 3600
        note.sound = "ping.aiff";
        note.badge = 1;
        note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
        note.payload = {'messageFrom': 'Caroline'};

        apnConnection.pushNotification(note, myDevice);

        return {success: 'ok'}
    }
});

Meteor.call('sendPush');