module.exports.run = async utils => {

  var message = utils.message;
  var embeds = utils.embeds;

  var channelNameArray =  message.channel.name.split("-");

  if (channelNameArray[1] == "ticket") {

    if (message.member.hasPermission("MANAGE_MESSAGES")) {

      message.channel.delete();

      var user = utils.bot.users.get(channelNameArray[0]);

      user.send(embeds.forcecloseticket(user.tag));

    } else {

      message.channel.send(embeds.noforcepermticket(message.author.tag));

    }

  } else {

    message.channel.send(embeds.notinticket(message.author.tag));

  }

  message.delete().catch(() => {});

};

module.exports.help = {

  name: "tforce"

};
