module.exports.run = async utils => {

  let enabled = await utils.MySQL.cmdsEnabled(utils.message.guild.id);
  if (!enabled.music) return;

  let message = utils.message;
  let bot = utils.bot;
  let embeds = utils.embeds;
  let args = utils.args;
  let serverQueue = utils.serverQueue;

  let Ytdl = utils.Ytdl;
  let Ytsearch = utils.Ytsearch;

  let voiceChannel = message.member.voiceChannel;

  message.delete();

  if (!voiceChannel) return message.channel.send(embeds.notinvoicechannelmusic(message.author.tag));

  if (message.guild.me.voiceChannel && !voiceChannel.members.has(bot.user.id)) return message.channel.send(embeds.notinsamechannelmusic(message.author.tag));

  if (!voiceChannel.permissionsFor(bot.user).has("CONNECT") || !voiceChannel.permissionsFor(bot.user).has("SPEAK")) return message.channel.send(embeds.nopermtoconmusic(message.author.tag));

  if (args.length < 1) return message.channel.send(embeds.wrongplayusagemusic(message.author.tag));

  let songString = args.join(" ");

  let songId;

  if (Ytdl.validateURL(songString)) songId = songString;
  else {

    let result = await utils.toPromise(this, Ytsearch, songString);

    if (result.videos.length < 1) return message.channel.send(embeds.noresultsmusic(message.author.tag, songString));

    if (Ytdl.validateURL(result.videos[0].videoId)) songId = result.videos[0].videoId; else {

      if (result.videos.length < 2) return message.channel.send(embeds.noresultsmusic(message.author.tag, songString));

      songId = result.videos[1].videoId;

    }

  }

  let songInfo = await Ytdl.getInfo(songId);

  let songData = {

    title: songInfo.title,
    url: songInfo.video_url,
    user: message.author

  };

  if (serverQueue) {

    serverQueue.songs.push(songData);

    message.channel.send(embeds.addqueuemusic(message.author.tag, songData.title));

  } else {

    let guildQueue = {

      voiceChannel: voiceChannel,
      connection: null,
      dispatcher: null,
      songs: [],
      volume: 5,
      playing: true,
      skipCount: 0,
      skipUsers: [],
      skipCap: Math.floor(voiceChannel.members.size / 2) + 1,
      stopCount: 0,
      stopUsers: [],
      stopCap: Math.floor(voiceChannel.members.size / 2) + 1,

    };

    guildQueue.songs.push(songData);


    try {

      let connection = await voiceChannel.join();
      guildQueue.connection = connection;

      utils.updateQueue(guildQueue);

      playSong(guildQueue.songs[0]);


    } catch (err) {

      message.channel.send(embeds.errorplaymusic(message.author.tag));

    }

  }

  async function playSong(songData) {

    let serverQueue = bot.queue.get(message.guild.id);

    if (songData) {

      message.channel.send(embeds.nowplayingmusic(songData.user.tag, songData.title));

      serverQueue.dispatcher = serverQueue.connection.playStream(Ytdl(songData.url, {filter: "audioonly"})).once("end", () => {

        serverQueue.songs.shift();
        serverQueue.skipCount = 0;
        serverQueue.skipUsers = [];
        serverQueue.skipCap = Math.floor(voiceChannel.members.size-1 / 2) + 1;
        serverQueue.stopCap = Math.floor(voiceChannel.members.size-1 / 2) + 1;

        utils.updateQueue(serverQueue);

        playSong(serverQueue.songs[0]);

      }).on("error", error => {

        message.channel.send(embeds.errorplaymusic(bot.user.tag));

        console.log(error);


      });

      utils.updateQueue(serverQueue);

    } else {

      serverQueue.voiceChannel.leave();

      bot.queue.delete(message.guild.id);

    }

  }

};

module.exports.help = {

  name: ["play", "p"]

};
