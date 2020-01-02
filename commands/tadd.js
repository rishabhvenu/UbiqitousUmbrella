module.exports.run = async utils => {

  var message = utils.message;
  var embeds = utils.embeds;
  var args = utils.args;
  var bot = utils.bot;

  var userId = message.member.user.id;

  var channelNameArray =  message.channel.name.split("-");

  if (channelNameArray[1] == "ticket") {

    if (channelNameArray[0] == userId) {

      if (args.length < 1) {

        message.channel.send(embeds.wrongaddusageticket(message.author.tag));

      } else {

        var addTUser;

        if (message.mentions.members.first()) {

          addTUser = message.mentions.members.first();

          afterUserArgCheck(addTUser.user);

        } else {

          var users = [];

          bot.users.tap(user => {

            users.push(user.username);

          });

          addTUser = bot.users.find(u => u.username === utils.StringSimilarity.findBestMatch(args[0], users).bestMatch.target);

          afterUserArgCheck(addTUser);

        }

      }

    } else {

      message.channel.send(embeds.nodeletepermticket(message.author.tag));

    }

  } else {

    message.channel.send(embeds.notinticket(message.author.tag));

  }

  function afterUserArgCheck(addTUser) {

    message.channel.overwritePermissions(addTUser, {

      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      READ_MESSAGE_HISTORY: true

    });

    message.channel.send(embeds.successuseraddticket(message.author.tag, addTUser.id, addTUser.tag));

  }

  message.delete();

};

module.exports.help = {

  name: "tadd"

};
