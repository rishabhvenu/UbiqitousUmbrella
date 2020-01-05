module.exports.run = async utils => {

  var message = utils.message;
  var bot = utils.bot;
  var embeds = utils.embeds;
  var args = utils.args;
  var queue = utils.queue;
  var serverQueue = utils.serverQueue;

  var Ytdl = utils.Ytdl;
  var Ytsearch = utils.Ytsearch;

  var voiceChannel = message.member.voiceChannel;

  message.delete();

  if (!voiceChannel) return message.channel.send(embeds.notinvoicechannelmusic(message.author.tag));

  if (message.guild.me.voiceChannel && !voiceChannel.members.has(bot.user.id)) return message.channel.send(embeds.notinsamechannelmusic(message.author.tag));

  if (!voiceChannel.permissionsFor(bot.user).has("CONNECT") || !voiceChannel.permissionsFor(bot.user).has("SPEAK")) return message.channel.send(embeds.nopermtoconmusic(message.author.tag));

  if (args.length < 1) return message.channel.send(embeds.wrongplayusagemusic(message.author.tag));

  var songString = args.join(" ");

  var songId;

  if (Ytdl.validateURL(songString)) {

    songId = songString;

  } else {

    var result = await Ytsearch(songString).catch(() => message.channel.send(embeds.errorplaymusic(message.author.tag)));

    if (result.videos.length < 1) return message.channel.send(embeds.noresultsmusic(message.author.tag, songString));

    if (Ytdl.validateURL(result.videos[0].videoId)) songId = result.videos[0].videoId; else {

      if (result.videos.length < 2) return message.channel.send(embeds.noresultsmusic(message.author.tag, songString));

      songId = result.videos[1].videoId;

    }

  }

  var songInfo = await Ytdl.getInfo(songId);

  var songData = {

    title: songInfo.title,
    url: songInfo.video_url,
    user: message.author

  };

  if (serverQueue) {

    serverQueue.songs.push(songData);

    message.channel.send(embeds.addqueuemusic(message.author.tag, songData.title));

  } else {

    var guildQueue = {

      textChannel: message.channel,
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

      var connection = await voiceChannel.join();
      guildQueue.connection = connection;

      utils.updateQueue(guildQueue);

      playSong(guildQueue.songs[0]);


    } catch (err) {

      message.channel.send(embeds.errorplaymusic(message.author.tag));

    }

  }

  async function playSong(songData) {

    var serverQueue = queue.get(message.guild.id);

    if (songData) {

      message.channel.send(embeds.nowplayingmusic(songData.user.tag, songData.title));

      serverQueue.dispatcher = await serverQueue.connection.playStream(Ytdl(songData.url, {

        filter: "audioonly"

      }));

      serverQueue.dispatcher.once("end", () => {

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


    } else {

      serverQueue.voiceChannel.leave();

      queue.delete(message.guild.id);

    }

  }

};

module.exports.help = {

  name: ["play", "p"]

};