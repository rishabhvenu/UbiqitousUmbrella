module.exports.run = async utils => {

  let message = utils.message;
  let embeds = utils.embeds;

  let channelNameArray =  message.channel.name.split("-");

  message.delete();

  if (channelNameArray[1] != "ticket") return message.channel.send(embeds.notinticket(message.author.tag));

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.noforcepermticket(message.author.tag));

  message.channel.delete();

  let user = utils.bot.users.get(channelNameArray[0]);

  user.send(embeds.forcecloseticket(user.tag));

};

module.exports.help = {

  name: ["tforce", "ticketforce"]

};
