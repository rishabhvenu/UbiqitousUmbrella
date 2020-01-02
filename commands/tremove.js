module.exports.run = async utils => {

  var message = utils.message;
  var embeds = utils.embeds;
  var args = utils.args;

  var userId = message.member.user.id;

  var channelNameArray =  message.channel.name.split("-");

  if (channelNameArray[1] == "ticket") {

    if (channelNameArray[0] == userId) {

      if (args.length < 1) {

        message.channel.send(embeds.wrongremoveusageticket(message.author.tag));

      } else {

        var removeTUser;

        if (message.mentions.members.first()) {

          removeTUser = message.mentions.members.first();

          if (message.channel.members.has(removeTUser.user.id) && !removeTUser.hasPermission("MANAGE_MESSAGES")) {

            afterUserArgCheck(removeTUser.user);

          } else {

            message.channel.send(embeds.nouserremoveticket(message.author.tag));

          }

        } else {

          var users = [];

          message.channel.members.tap(member => {

            if (!member.hasPermission("MANAGE_MESSAGES")) {

              users.push(member.user.username);

            }

          });

          if (users.length < 1) {

            message.channel.send(embeds.nouserremoveticket(message.author.tag));

          } else {

            removeTUser = message.channel.members.find(m => m.user.username === utils.StringSimilarity.findBestMatch(args[0], users)
              .bestMatch.target);

            afterUserArgCheck(removeTUser.user);

          }

        }

      }

    }

  }

  function afterUserArgCheck(removeTUser) {

    message.channel.overwritePermissions(removeTUser, {

      VIEW_CHANNEL: false,
      SEND_MESSAGES: false,
      READ_MESSAGE_HISTORY: false

    });

    message.channel.send(embeds.successuserremoveticket(message.author.tag, removeTUser.id, removeTUser.tag));

  }

  message.delete();

};

module.exports.help = {

  name: "tremove"

};
