module.exports.run = async utils => {

  let message = utils.message;
  let embeds = utils.embeds;

  let channelNameArray =  message.channel.name.split("-");

  message.delete();

  if (channelNameArray[1] != "ticket") return message.channel.send(embeds.notinticket(message.author.tag));

  if (channelNameArray[0] != message.author.id) return message.channel.send(embeds.nodeletepermticket(message.author.tag));

  let msg = await message.channel.send(embeds.confirmdeleteticket(message.author.tag));

  addReactions(msg);

  setTimeout(() => msg.edit(embeds.ranoutoftimeticket(message.author.tag)).catch(() => {}), 30000);

  async function addReactions(msg) {

    await msg.react("✅");
    await msg.react("❌");

  }

};


module.exports.help = {

  name: ["tdelete", "ticketdelete", "td", "ticketclose", "tc"]

};
