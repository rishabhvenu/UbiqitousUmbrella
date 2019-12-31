const Discord = require("discord.js");
const embeds = require("./../embeds.js");

const emojiArray = ["⬅️", "🎉", "📜", "🎫", "🔨", "❌"];
const emojiOArray = ["⬅️", "🎉", "📜", "🎫", "❌"];

module.exports.run = async (utils) => {

  var message = utils.message;

  const hasPerm = message.member.hasPermission("MANAGE_MESSAGES");

  if (hasPerm) {

    message.channel.send(embeds.optionMenu.setFooter(message.author.id)).then(msg => {

      reactOptions(msg);

    });

  } else {

    message.channel.send(embeds.optOutPermMenu.setFooter(message.author.id)).then(msg => {

      reactOptions(msg);

    })

  }

  async function reactOptions(msg) {

    if (hasPerm) {

      for (var numb = 0; numb < emojiArray.length; numb++) {

        await msg.react(emojiArray[numb]);

      }

    } else {

      for (var numb = 0; numb < emojiOArray.length; numb++) {

        await msg.react(emojiOArray[numb]);

      }

    }

    setTimeout(function() {
      msg.delete();
    }, 300000);

  }

  message.delete();

}


module.exports.help = {
  name: "help"
}
