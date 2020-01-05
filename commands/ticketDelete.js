module.exports.run = async utils => {

  var message = utils.message;
  var embeds = utils.embeds;

  var channelNameArray =  message.channel.name.split("-");

  message.delete();

  if (channelNameArray[1] != "ticket") return message.channel.send(embeds.notinticket(message.author.tag));

  if (channelNameArray[0] != message.author.id) return message.channel.send(embeds.nodeletepermticket(message.author.tag));

  var msg = await message.channel.send(embeds.confirmdeleteticket(message.author.tag));

  addReactions(msg);

  setTimeout(() => msg.edit(embeds.ranoutoftimeticket(message.author.tag)).catch(() => {}), 30000);

  async function addReactions(msg) {

    await msg.react("✅");
    await msg.react("❌");

  }

};


module.exports.help = {

  name: ["tdelete", "ticketdelete", "td"]

};
