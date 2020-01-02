const emojiArray = ["⬅️", "🎉", "📜", "🎫", "🔨", "❌"];
const emojiOArray = ["⬅️", "🎉", "📜", "🎫", "❌"];

module.exports.run = async utils => {

  var embeds = utils.embeds;
  var message = utils.message;

  const hasPerm = message.member.hasPermission("MANAGE_MESSAGES");

  if (hasPerm) {

    message.channel.send(embeds.optionMenu(message.author.id)).then(msg => {

      reactOptions(msg);

    });

  } else {

    message.channel.send(embeds.optOutPermMenu(message.author.id)).then(msg => {

      reactOptions(msg);

    });

  }

  async function reactOptions(msg) {

    if (hasPerm) {

      for (var numb = 0; numb < emojiArray.length; numb++) {

        await msg.react(emojiArray[numb]);

      }

    } else {

      for (numb = 0; numb < emojiOArray.length; numb++) {

        await msg.react(emojiOArray[numb]);

      }

    }

    setTimeout(function() {
      if (!msg.deleted) {
        msg.delete();
      }
    }, 300000);

  }

  message.delete();

};


module.exports.help = {

  name: "help"

};
