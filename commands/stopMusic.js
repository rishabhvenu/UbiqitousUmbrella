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

  if (voiceChannel.members.size < 3) {

    message.channel.send(embeds.successvotestop(message.author.tag, 1, 1));

    serverQueue.songs = [];
    serverQueue.dispatcher.end("end");

    utils.updateQueue(serverQueue);

  } else {

    if (serverQueue.stopUsers.includes(message.member.id)) return message.channel.send(embeds.alreadyvotestop(message.author.tag, serverQueue.stopCount, serverQueue.stopCap));

    serverQueue.stopCount += 1;
    serverQueue.stopUsers.push(message.member.id);

    if (serverQueue.stopCount < serverQueue.stopCap) {

      message.channel.send(embeds.successaddvotestop(message.author.tag, serverQueue.stopCount, serverQueue.stopCap));
      return utils.updateQueue(serverQueue);

    }

    message.channel.send(embeds.successvotestop(message.author.tag, serverQueue.stopCount, serverQueue.stopCap));

    serverQueue.songs = [];

    utils.updateQueue(serverQueue);

    serverQueue.dispatcher.end("end");

  }

};

module.exports.help = {

  name: "stop"

};
