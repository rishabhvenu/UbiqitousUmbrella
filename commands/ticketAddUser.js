module.exports.run = async utils => {

  if (!utils.MySQL.cmdsEnabled.ticket) return;
  
  let message = utils.message;
  let embeds = utils.embeds;
  let args = utils.args;

  let channelNameArray =  message.channel.name.split("-");

  message.delete();

  if (channelNameArray[1] != "ticket") return message.channel.send(embeds.notinticket(message.author.tag));

  if (channelNameArray[0] != message.author.id) return message.channel.send(embeds.noaddpermticket(message.author.tag));

  if (args.length < 1) return message.channel.send(embeds.wrongaddusageticket(message.author.tag));

  let addTUser;

  if (message.mentions.members.first()) {

    addTUser = message.mentions.members.first().user;

    if (!message.guild.members.has(addTUser.id) || message.mentions.members.first().hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.nouseraddticket(message.author.tag));

  } else {

    let users = [];

    message.guild.members.filter(member => !member.hasPermission("MANAGE_MESSAGES") && !message.channel.permissionsFor(member).has("VIEW_CHANNEL")).forEach(member => {

      users.push(member.user.tag);

    });

    addTUser = message.guild.members.find(u => u.user.tag === utils.StringSimilarity.findBestMatch(args[0], users).bestMatch.target).user;

  }

  message.channel.overwritePermissions(addTUser, {

    VIEW_CHANNEL: true,
    SEND_MESSAGES: true,
    READ_MESSAGE_HISTORY: true

  });

  message.channel.send(embeds.successuseraddticket(message.author.tag, addTUser.id, addTUser.tag, addTUser.avatarURL));

};

module.exports.help = {

  name: ["tadd", "ticketadd"]

};
