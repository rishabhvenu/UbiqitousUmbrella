module.exports.run = async utils => {

  var message = utils.message;
  var bot = utils.bot;
  var embeds = utils.embeds;
  var serverQueue = utils.serverQueue;

  var voiceChannel = message.member.voiceChannel;

  message.delete();

  if (!voiceChannel) return message.channel.send(embeds.notinvoicechannelmusic(message.author.tag));

  if (!voiceChannel.members.has(bot.user.id)) return message.channel.send(embeds.notinsamechannelmusic(message.author.tag));

  if (!serverQueue || serverQueue.songs.length < 1) message.channel.send(embeds.nosongsqueuedmusic(message.author.tag));

  if (voiceChannel.members.size < 3) {

    message.channel.send(embeds.successvoteskip(message.author.tag, serverQueue.songs[0].title, 1, 1));

    serverQueue.dispatcher.end("end");

  } else {

    if (serverQueue.skipUsers.includes(message.member.id)) return message.channel.send(embeds.alreadyvoteskip(message.author.tag, serverQueue.songs[0].title, serverQueue.skipCount,
      serverQueue.skipCap));

    serverQueue.skipCount += 1;
    serverQueue.skipUsers.push(message.member.id);

    utils.updateQueue(serverQueue);

    if (serverQueue.skipCap < serverQueue.skipCap) return message.channel.send(embeds.successaddvoteskip(message.author.tag, serverQueue.songs[0].title, serverQueue.skipCount, serverQueue.skipCap));

    message.channel.send(embeds.successvoteskip(message.author.tag, serverQueue.songs[0].title, serverQueue.skipCount, serverQueue.skipCap));

    serverQueue.dispatcher.end("end");

  }
  
};

module.exports.help = {

  name: ["skip", "s"]

};
