module.exports.run = async utils => {

  let enabled = await utils.MySQL.cmdsEnabled(utils.message.guild.id);
  if (!enabled.music) return;
  
  let message = utils.message;
  let bot = utils.bot;
  let embeds = utils.embeds;
  let serverQueue = utils.serverQueue;

  let voiceChannel = message.member.voiceChannel;

  message.delete();

  if (!voiceChannel) return message.channel.send(embeds.notinvoicechannelmusic(message.author.tag));

  if (!voiceChannel.members.has(bot.user.id)) return message.channel.send(embeds.notinsamechannelmusic(message.author.tag));

  if (!serverQueue || serverQueue.songs.length < 1) message.channel.send(embeds.nosongsqueuedmusic(message.author.tag));

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.noresumepermmusic(message.author.tag));

  if (!serverQueue.dispatcher.paused) return message.channel.send(embeds.alreadyresumemusic(message.author.tag));

  serverQueue.dispatcher.resume();

  message.channel.send(embeds.successresumemusic(message.author.tag));

};

module.exports.help = {

  name: "resume"

};
