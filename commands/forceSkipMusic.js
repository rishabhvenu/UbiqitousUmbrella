module.exports.run = async utils => {

  let message = utils.message;
  let bot = utils.bot;
  let embeds = utils.embeds;
  let serverQueue = utils.serverQueue;

  let voiceChannel = message.member.voiceChannel;

  message.delete();

  if (!voiceChannel) return message.channel.send(embeds.notinvoicechannelmusic(message.author.tag));

  if (!voiceChannel.members.has(bot.user.id)) return message.channel.send(embeds.notinsamechannelmusic(message.author.tag));

  if (!serverQueue || serverQueue.songs.length < 1) message.channel.send(embeds.nosongsqueuedmusic(message.author.tag));

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.noforceskippermmusic(message.author.tag));

  message.channel.send(embeds.successvoteskip(message.author.tag, serverQueue.songs[0].title, 1, 1));

  serverQueue.dispatcher.end("end");

};

module.exports.help = {

  name: ["forceskip", "fsskip", "fs"]

};
