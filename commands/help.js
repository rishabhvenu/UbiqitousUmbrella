const emojiArray = ["⬅️", "🎉", "📜", "🎫", "🔨", "❌"];
const emojiOArray = ["⬅️", "🎉", "📜", "🎫", "❌"];

module.exports.run = async utils => {

  let embeds = utils.embeds;
  let message = utils.message;

  message.delete();

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.optOutPermMenu(message.author.id))
    .then(msg => reactOptions(msg));

  message.channel.send(embeds.optionMenu(message.author.id)).then(msg => reactOptions(msg));

  async function reactOptions(msg) {

    if (message.member.hasPermission("MANAGE_MESSAGES")) {

      for (let numb = 0; numb < emojiArray.length; numb++) {

        await msg.react(emojiArray[numb]);

      }

    } else {

      for (let numb = 0; numb < emojiOArray.length; numb++) {

        await msg.react(emojiOArray[numb]);

      }

    }

    setTimeout(() => msg.delete(), 300000);

  }

};


module.exports.help = {

  name: "help"

};
