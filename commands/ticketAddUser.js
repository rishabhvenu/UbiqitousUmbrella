module.exports.run = async utils => {

  var message = utils.message;
  var embeds = utils.embeds;
  var args = utils.args;
  var bot = utils.bot;

  var channelNameArray =  message.channel.name.split("-");

  message.delete();

  if (channelNameArray[1] != "ticket") return message.channel.send(embeds.notinticket(message.author.tag));

  if (channelNameArray[0] != message.author.id) return message.channel.send(embeds.noaddpermticket(message.author.tag));

  if (args.length < 1) return message.channel.send(embeds.wrongaddusageticket(message.author.tag));

  var addTUser;

  if (message.mentions.members.first()) addTUser = message.mentions.members.first(); else {

    var users = [];

    bot.users.tap(user => {

      users.push(user.username);

    });

    addTUser = bot.users.find(u => u.username === utils.StringSimilarity.findBestMatch(args[0], users).bestMatch.target);

  }

  message.channel.overwritePermissions(addTUser, {

    VIEW_CHANNEL: true,
    SEND_MESSAGES: true,
    READ_MESSAGE_HISTORY: true

  });

  message.channel.send(embeds.successuseraddticket(message.author.tag, addTUser.id, addTUser.tag));

};

module.exports.help = {

  name: ["tadd", "ticketadd"]

};
