module.exports = {
    main: function(Bot, m, args) {
        function isNumeric(num) {
            return !isNaN(num)
        }
        var number = 202
        var args = m.cleanContent.replace("!clean ", "").split(" ")
        var argsIterator = args.entries()
        for (let e of argsIterator) {
            if (isNumeric(+e[1])) {
                var int = +e[1]
            }
        }
        if (!int) {
          int = 10
        }
        var responses = ["Are you a real villan?", "Have you ever caught a good guy? \nLike a real super hero?", "Have you ever tried a disguise?", "What are you doing?!?!?!", "*NO!*, Don't touch that!", "Fuck Off", "Roses are red\nfuck me ;) "]
        var response = responses[Math.floor(Math.random() * responses.length)]
        if (m.mentions[0]) {
          if (m.author.id == "161027274764713984" || m.author.id == m.channel.guild.ownerID) {
              m.delete()
              Bot.createMessage(m.channel.id, 'Time to clean up').then(a => {
                return setTimeout(function() {
                    a.delete()
                }, 5000)
              })
              Bot.getMessages(m.channel.id, parseInt(number)).then(async function(msgs) {
                  var i = 0
                  var count = 0
                  while (i < int) {
                    if (msgs[count].author.id == m.mentions[0].id) {
                        Bot.deleteMessage(msgs[count].channel.id, msgs[count].id)
                        i++
                    }
                    if (i == int || count == msgs.length) {
                          Bot.createMessage(m.channel.id, "All Done~").then(die => {
                            return setTimeout(function() {
                                die.delete()
                            }, 5000)
                          })
                          return;
                    }
                    count++
                  }
              });
            return;
          }
        }
        if (!m.mentions[0]) {
          Bot.createMessage(m.channel.id, "Please mention who you want to clean, and optionally, a number of messages to delete from them");
          return;
        } else {
            Bot.createMessage(m.channel.id, response);
        }
    },
    help: "Clean stuff. `!clean @Chocola X` to delete the last X messages. Defaults to 10"
}
