module.exports = {
    main: function(Bot, m, args, prefix) {
        var hands = [":ok_hand::skin-tone-1:", ":ok_hand::skin-tone-2:", ":ok_hand::skin-tone-3:", ":ok_hand::skin-tone-4:", ":ok_hand::skin-tone-5:", ":ok_hand:"]
        var hand = hands[Math.floor(Math.random() * hands.length)]
        var downs = [":thumbsdown::skin-tone-1:", ":thumbsdown::skin-tone-2:", ":thumbsdown::skin-tone-3:", ":thumbsdown::skin-tone-4:", ":thumbsdown::skin-tone-5:", ":thumbsdown:"]
        var down = downs[Math.floor(Math.random() * downs.length)]
        var guild = m.channel.guild
        m.content = m.content.toLowerCase()
        if (m.content == `${prefix}role` || m.content == `${prefix}role `) {
            Bot.createMessage(m.channel.id, "What do you want to do? | `!role add <role name>` | `!role remove <role name>`");
            return;
        }
        if (m.content.includes(`${prefix}role  `)) {
            Bot.createMessage(m.channel.id, "One space Please");
            return;
        }
        if (m.content.includes(`${prefix}role   `)) {
            Bot.createMessage(m.channel.id, "***One*** space Please");
            return;
        }
        var roles = {
            "big": "356005613630914560",
            "streamengine": "358727281377542146",
            "switch": "356005806681882656",
            "creator": "358537297538318336",
            "small": "356005120816971786",
            "neutral": "358535595892670465",
            "degenerate": "372625251819061249"
        }
        if (m.channel.guild.id == "326172270370488320") {
          var roles = {
            "tiny": "326479817165766657",
            "expansion": "343903114484776961",
            "streamlads": "348956858704199683",
            "expansion": "343903114484776961",
            "giant": "326479986527567872",
            "giantess": "326479753806872586",
            "switch": "326492362123640843",
            "macro furry": "326479916553994260",
            "goddess": "346299914222960641",
            "artist": "326513572966432769",
            "lurkers": "326834501613518858",
            "norms": "333002335414386688",
            "micro": "371363527388299283"
          }
        }
        if (m.channel.guild.id == "416487280237215744") {
          var roles = {
            "worshipper": "416496472926715917",
            "toy": "416852773196267521",
            "commoner": "416852902313721866",
            "switch": "418127170070642690",
            "rpfriendly": "420378132810301441",
            "rpunfriendly": "420378244316004362",
            "giantess": "416852995385327637",
            "goddess": "416853083633745939",
            "creator": "418657403672854529"
          }
        }
        if (m.channel.guild.id == "372587460800282625") {
          var roles = {
            "tiny": "372604586978181120",
            "giantess/giant": "372605057642004481",
            "normal sized": "376111382103326730",
            "giga": "376157347594371072",
            "mega": "376157449901703180",
            "macro": "376157502720573441",
            "micro": "376157654525149194",
            "tamaño normal": "377173536474660864",
            "gigante/giganta": "379310900210958340"
          }
        }
        if (m.channel.guild.id == "396122792531197952") {
          var roles = {
            "pirate party": "397360783216082946",
            "head of the giant party": "397360293052940298",
            "goddess": "397651429239816203",
            "human male": "397661187321626625",
            "tiny female": "397665523372130304",
            "liberal": "397985828653236234",
            "gods": "397653419718082561",
            "republicans": "396156426239606785",
            "liberal democrats (uk)": "398213298732138498",
            "giant party": "397196918926737409",
            "tiny party": "397119025223827456",
            "green party": "397184860252405771",
            "libertarian": "396157092047749131",
            "human female": "397661693238575115",
            "tiny male": "397663371404640256",
            "socialist": "397122591849971712",
            "micro": "397669886014259212",
            "head of the giantess party": "397360289307426816",
            "giant": "397659084037423115",
            "giantess": "397656534873800704",
            "dragon": "398212293470453773",
            "switch": "397968217890357248",
            "dragon nationalist": "398212875795300352",
            "democrats": "396155836248096768",
            "head of the tiny party": "397360295242235904",
            "giantess party": "397119269604950017"
          }
        }

        if (m.mentions.length > 0 && m.mentions[0].id != m.author.id) {
            Bot.createMessage(m.channel.id, "You can only assign roles to yourself");
            return;
        }
        if (m.content.includes("add")) {
            if (!m.content.includes(" | ")) {
                var content = m.cleanContent.toLowerCase().replace(`${prefix}role add `, "")
                if (roles[content]) {
                    var roleID = roles[content]
                    Bot.addGuildMemberRole(m.channel.guild.id, m.author.id, roleID, "They...asked for it?").then(() => {
                        return Bot.createMessage(m.channel.id, hand + " Successful added: " + content).then((msg) => {
                            return setTimeout(function() {
                                Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                            }, 5000) && setTimeout(function() {
                                Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                            }, 5000)
                        })
                    })
                    return;
                } else {
                    Bot.createMessage(m.channel.id, content + ": Not found").then((msg) => {
                        return setTimeout(function() {
                            Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                        }, 5000) && setTimeout(function() {
                            Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                        }, 5000)
                    })
                    return;
                }
            } else if (m.content.includes(" | ")) {
                var content = m.cleanContent.toLowerCase().replace(`${prefix}role add `, "").split(" | ")
                var iterator = content.entries()
                var found = []
                var notFound = []
                for (let e of iterator) {
                    if (roles[e[1]]) {
                        var roleID = roles[e[1]]
                        Bot.addGuildMemberRole(m.channel.guild.id, m.author.id, roleID, "They...asked for it?");
                        found.push(e[1]);
                    } else if (!roles[e[1]]) {
                        notFound.push(e[1])
                    }
                }
                if (found.length > 0) {
                    Bot.createMessage(m.channel.id, hand + " Successfuly added: " + found.join(", ")).then((msg) => {
                        return setTimeout(function() {
                            Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                        }, 5000) && setTimeout(function() {
                            Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                        }, 5000)
                    })
                    return;
                }
                if (notFound.length > 0) {
                    Bot.createMessage(m.channel.id, down + " Unable to add: " + notFound.join(", ")).then((msg) => {
                        return setTimeout(function() {
                            Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                        }, 5000) && setTimeout(function() {
                            Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                        }, 5000)
                    })
                }
                return;
            }
        }
        if (m.content.includes("remove")) {
            if (!m.content.includes(" | ")) {
                var content = m.cleanContent.toLowerCase().replace(`${prefix}role remove `, "")
                if (roles[content]) {
                    var roleID = roles[content]
                    Bot.removeGuildMemberRole(m.channel.guild.id, m.author.id, roleID, "They...asked for it?").then(() => {
                        return Bot.createMessage(m.channel.id, hand + " Successful removed: " + content).then((msg) => {
                            return setTimeout(function() {
                                Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                            }, 5000) && setTimeout(function() {
                                Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                            }, 5000)
                        })
                    })
                    return;
                } else {
                    Bot.createMessage(m.channel.id, content + ": Not found").then((msg) => {
                        return setTimeout(function() {
                            Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                        }, 5000) && setTimeout(function() {
                            Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                        }, 5000)
                    })
                    return;
                }
            } else if (m.content.includes(" | ")) {
                var content = m.cleanContent.toLowerCase().replace(`${prefix}role remove `, "").split(" | ")
                var iterator = content.entries()
                var found = []
                var notFound = []
                for (let e of iterator) {
                    if (roles[e[1]]) {
                        var roleID = roles[e[1]]
                        Bot.removeGuildMemberRole(m.channel.guild.id, m.author.id, roleID, "They...asked for it?");
                        found.push(e[1]);
                    } else if (!roles[e[1]]) {
                        notFound.push(e[1])
                    }
                }
                if (found.length > 0) {
                    Bot.createMessage(m.channel.id, hand + " Successfuly removed: " + found.join(", ")).then((msg) => {
                        return setTimeout(function() {
                            Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                        }, 5000) && setTimeout(function() {
                            Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                        }, 5000)
                    })
                }
                if (notFound.length > 0) {
                    Bot.createMessage(m.channel.id, down + " Unable to remove: " + notFound.join(", ")).then((msg) => {
                        return setTimeout(function() {
                            Bot.deleteMessage(msg.channel.id, msg.id, "Timeout")
                        }, 5000) && setTimeout(function() {
                            Bot.deleteMessage(m.channel.id, m.id, "Timeout")
                        }, 5000)
                    })
                }
                return;
            }
        }

    },
    help: "Assign your role. `!role add rolename`"
}
