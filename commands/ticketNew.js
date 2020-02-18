module.exports.run = async utils => {

  let enabled = await utils.MySQL.cmdsEnabled(utils.message.guild.id);
  if (!enabled.ticket) return;

  let message = utils.message;
  let embeds = utils.embeds;

  message.delete();

  let channelExists = message.guild.channels.find(channel => channel.name === `${message.author.id}-ticket`);

  if (channelExists) return message.channel.send(embeds.ticketexists(message.author.tag, channelExists.id));

  let ticketCat = message.guild.channels.find(channel => channel.name.toLowerCase() === "tickets" && channel.type == "category");

  if (ticketCat == null) {

    message.guild.createChannel("TICKETS", {

      type: "category"

    });

    ticketCat = message.guild.channels.find(category => category.name === "TICKETS" && category.type == "category");

  }

  let channel = await message.guild.createChannel(`${message.author.id}-ticket`, {

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
