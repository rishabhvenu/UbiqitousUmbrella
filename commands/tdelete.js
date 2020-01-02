module.exports.run = async utils => {

  var message = utils.message;
  var embeds = utils.embeds;

  var userId = message.member.user.id;

  var channelNameArray =  message.channel.name.split("-");

  if (channelNameArray[1] == "ticket") {

    if (channelNameArray[0] == userId) {

      message.channel.send(embeds.confirmdeleteticket(message.author.tag)).then(msg => {

        addReactions(msg);

        setTimeout(function() {

          msg.edit(embeds.ranoutoftimeticket(message.author.tag)).catch(() => {});

        }, 30000);

      });

    } else {

      message.channel.send(embeds.nodeletepermticket(message.author.tag));

    }

  } else {

    message.channel.send(embeds.notinticket(message.author.tag));

  }

  message.delete();

  async function addReactions(msg) {

    await msg.react("✅");
    await msg.react("❌");

  }

};


module.exports.help = {

  name: "tdelete"

};
