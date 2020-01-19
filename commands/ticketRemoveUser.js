module.exports.run = async utils => {

  let message = utils.message;
  let embeds = utils.embeds;
  let args = utils.args;

  let channelNameArray =  message.channel.name.split("-");

  message.delete();

  if (channelNameArray[1] != "ticket") return message.channel.send(embeds.notinticket(message.author.tag));

  if (channelNameArray[0] != message.author.id) return message.channel.send(embeds.noremovepermticket(message.author.tag));

  if (args.length < 1) return message.channel.send(embeds.wrongremoveusageticket(message.author.tag));

  let removeTUser;

  if (message.mentions.members.first()) {

    removeTUser = message.mentions.members.first();

    if (!message.channel.members.has(removeTUser.user.id) || removeTUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.nouserremoveticket(message.author.tag));

  } else {

    let usersArray = [];

    message.channel.members.filter(member => !member.hasPermission("MANAGE_MESSAGES")).tap(user => usersArray.push(user.user.tag));

    if (usersArray.length < 1) return message.channel.send(embeds.nouserremoveticket(message.author.tag));

    removeTUser = message.channel.members.find(m => m.user.tag === utils.StringSimilarity.findBestMatch(args[0], usersArray).bestMatch.target);

  }

  message.channel.overwritePermissions(removeTUser, {

    VIEW_CHANNEL: false,
    SEND_MESSAGES: false,
    READ_MESSAGE_HISTORY: false

  });

  message.channel.send(embeds.successuserremoveticket(message.author.tag, removeTUser.user.id, removeTUser.user.tag, removeTUser.user.avatarURL));

};

module.exports.help = {

  name: ["tremove", "ticketremove"]

};
