module.exports.run = async utils => {

  if (!utils.MySQL.cmdsEnabled.music) return;

  let message = utils.message;
  let bot = utils.bot;
  let embeds = utils.embeds;
  let serverQueue = utils.serverQueue;

  let voiceChannel = message.member.voiceChannel;

  message.delete();

  if (!voiceChannel) return message.channel.send(embeds.notinvoicechannelmusic(message.author.tag));

  if (!voiceChannel.members.has(bot.user.id)) return message.channel.send(embeds.notinsamechannelmusic(message.author.tag));

  if (!serverQueue || serverQueue.songs.length < 1) message.channel.send(embeds.nosongsqueuedmusic(message.author.tag));

  let songData = serverQueue.songs[0];

  message.channel.send(embeds.viewqueuemusic(message.author.tag, songData.title, songData.url, songData.user.tag, serverQueue));

};

module.exports.help = {

  name: ["queue", "vqueue", "viewqueue"]

};
