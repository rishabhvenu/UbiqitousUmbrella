module.exports.run = async utils => {

  var message = utils.message;
  var embeds = utils.embeds;

  message.delete();

  var channelExists = message.guild.channels.find(channel => channel.name === `${message.author.id}-ticket`);

  if (channelExists) return message.channel.send(embeds.ticketexists(message.author.tag, channelExists.id));

  var ticketCat = message.guild.channels.find(channel => channel.name.toLowerCase() === "tickets" && channel.type == "category");

  if (ticketCat == null) {

    message.guild.createChannel("TICKETS", {

      type: "category"

    });

    ticketCat = message.guildchannels.find(category => category.name === "TICKETS" && category.type == "category");

  }

  var channel = await message.guild.createChannel(`${message.author.id}-ticket`, {

    type: "text",
    permissionOverwrites: [{

      id: message.guild.defaultRole.id,
      deny: ["VIEW_CHANNEL"]

    }, {

      id: message.author.id,
      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]

    }]

  });

  channel.setParent(ticketCat);

  message.channel.send(embeds.ticketcreated(message.author.tag, channel.id));


};

module.exports.help = {

  name: ["tnew", "ticketnew"]

};
