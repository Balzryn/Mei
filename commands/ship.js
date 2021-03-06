const Jimp = require('jimp');

module.exports = {
    main: function(Bot, m, args, prefix) {
        if (m.mentions.length == 1 && m.author.id == m.mentions[0].id) { // If the user mentions only themself
            Bot.createMessage(m.channel.id, `Lovely shi... Alone? Don't be like that ${m.author.username} ;-; *hugs you*`)
            return;
        }
        if (m.mentions.length !== 2) { // If there are not 2 people mentioned,
            Bot.createMessage(m.channel.id, "Ship someone together~ <@user1> <@user2>")
            return;
        }


        Bot.sendChannelTyping(m.channel.id).then(async () => {
            try {
                var firstName = m.channel.guild.members.get(m.mentions[0].id).nick || m.mentions[0].username
                var lastName = m.channel.guild.members.get(m.mentions[1].id).nick || m.mentions[1].username
                if (firstName == lastName) {
                    Bot.createMessage(m.channel.id, "Lovely shi...Uhm, can you two stop being weird?")
                    return;
                }
                var firstPart = firstName.substring(0, firstName.length / 2);
                var lastPart = lastName.substring(lastName.length / 2);

                const bg = await Jimp.read("https://i.alexflipnote.xyz/b3e61a.png");
                const user1 = await Jimp.read(`https://images.discordapp.net/avatars/${m.mentions[0].id}/${m.mentions[0].avatar}.png?size=1024`);
                const user2 = await Jimp.read(`https://images.discordapp.net/avatars/${m.mentions[1].id}/${m.mentions[1].avatar}.png?size=1024`);
                bg.resize(384, 128)
                user1.resize(128, 128);
                user2.resize(128, 128);
                bg.clone()
                    .blit(user1, 0, 0)
                    .blit(user2, 256, 0)
                    .getBuffer(Jimp.MIME_PNG, function(err, buffer) {
                        Bot.createMessage(m.channel.id, `Lovely shipping~\nIntroducing: **${firstPart}${lastPart}**`, {
                            "file": buffer,
                            "name": "ship.png"
                        })
                    });
            } catch (error) {
                console.log(error);
                return Bot.createMessage(m.channel.id, "Something went wrong...");
            }
        });
    },
    help: "Ship someone together~ <@user1> <@user2>"
}
