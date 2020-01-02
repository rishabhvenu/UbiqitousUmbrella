module.exports.run = async (utils) => {

  var message = utils.message;
  var embeds = utils.embeds;

  var userId = message.member.user.id;
  var userTag = message.member.user.tag;

  var guild = message.guild;

  var channelExists = guild.channels.find(channel => channel.name === `${userId}-ticket`);

  if (channelExists) {

    message.channel.send(embeds.ticketexists(userTag, channelExists.id));

  } else {

    var ticketCat = guild.channels.find(channel => channel.name.toLowerCase() === "tickets" && channel.type == "category");

    if (ticketCat == null) {

      guild.createChannel("TICKETS", {

        type: "category"

      }).then(() => {

        ticketCat = guild.channels.find(channel => channel.name === "TICKETS" && channel.type == "category");

      });

    }

    guild.createChannel(`${userId}-ticket`, {

      type: "text",
      permissionOverwrites: [{

        id: guild.defaultRole.id,
        deny: ["VIEW_CHANNEL"]

      }, {

        id: userId,
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]

      }]

    }).then(channel => {

      channel.setParent(ticketCat);

      message.channel.send(embeds.ticketcreated(userTag, channel.id));

    });

  }

  message.delete();

};

module.exports.help = {

  name: "tnew"

};
