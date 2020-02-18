module.exports.run = async utils => {

  let enabled = await utils.MySQL.cmdsEnabled(utils.message.guild.id);
  if (!enabled.music) return;

  const message = utils.message;
  const bot = utils.bot;
  const embeds = utils.embeds;
  const serverQueue = utils.serverQueue;

  const voiceChannel = message.member.voiceChannel;

  message.delete();

  if (!voiceChannel) return message.channel.send(embeds.notinvoicechannelmusic(message.author.tag));

  if (!voiceChannel.members.has(bot.user.id)) return message.channel.send(embeds.notinsamechannelmusic(message.author.tag));

  if (!serverQueue || serverQueue.songs.length < 1) message.channel.send(embeds.nosongsqueuedmusic(message.author.tag));

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.noforcestoppermmusic(message.author.tag));

  message.channel.send(embeds.successvotestop(message.author.tag, 1, 1));

  serverQueue.songs = [];

  utils.updateQueue(serverQueue);

  serverQueue.dispatcher.end();

};

module.exports.help = {

  name: ["forcestop", "fstop"]

};
