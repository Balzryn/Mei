var apiai = require('apiai');
var config = require("../etc/config.json");
var app = apiai(config.tokens.apiai);

module.exports = {
    main: function(Bot, m, args, prefix) {
        var msg = m.cleanContent.replace(`${prefix}c `, "");
        if (m.content == `${prefix}c`) {
            Bot.createMessage(m.channel.id, "Please add something i.e. ``!c How are you?``")
        } else {
            var request = app.textRequest(msg, {
                sessionId: 'discordMei'
            });
            request.on('response', function(response) {
                let responseText = response.result.fulfillment.speech;
                Bot.createMessage(m.channel.id, responseText)
            });

            request.on('error', function(error) {
                console.log(error);
                Bot.createMessage(m.channel.id, error)
            });
            request.end();
        }
    },
    help: "Lets talk~"
}
