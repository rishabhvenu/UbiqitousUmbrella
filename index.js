const Discord = require("discord.js");
const fs = require("fs");
const StringSimilarity = require("string-similarity");
const Ytdl = require("ytdl-core");
const Ytsearch = require("yt-search");
const Spotify = require("spotify-web");
const MySQL = require("./mysql.js");

const queue = new Map();

const bot = new Discord.Client();

const tokenConfig = require("./botConfig.js");
const embeds = require("./embeds.js");
const Utils = require("./utils.js");

bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, file) => {

  if (err) console.log(err);

  let jsfile = file.filter(f => f.split(".").pop() === "js");

  if (jsfile.length < 1) {

    console.log("‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️");
    console.log("❌ Couldnt find any commands. ❌");
    console.log("‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️");
    return;
  }

  let props;

  jsfile.forEach(f => {

    props = require(`./commands/${f}`);

    console.log(`(Command) | ✅ -- ${f}`);

    if (props.help.name instanceof Array) {

      for (let alias in props.help.name) {

        bot.commands.set(props.help.name[alias], props);

      }

    } else {

      bot.commands.set(props.help.name, props);

    }

  });

});

fs.readdir("./listeners/", (err, file) => {

  if (err) console.log(err);

  let folders = file.filter(f => fs.lstatSync(`./listeners/${f}`).isDirectory());

  folders.forEach(listener => {

    bot.on(listener, param => {

      fs.readdir(`./listeners/${listener}/`, (err2, file2) => {

        if (err2) console.log(err2);

        let jsfile = file2.filter(f => f.split(".").pop() === "js");

        let command;

        jsfile.forEach(f => {

          command = require(`./listeners/${listener}/${f}`);

          let utils = {
            parameter: param,
            Discord: Discord,
            bot: bot,
            embeds: embeds,
            MySQL: MySQL
          };

          command(utils);

        });

      });

    });

  });

});



const PREFIX = "-";

bot.on("ready", () => {
  console.log("==================================");
  console.log(`${bot.user.username} is online!`);
  console.log("==================================");
  console.log("Bot's Information");
  console.log("----------------------------------");
  console.log(`Bot's Name: ${bot.user.username}`);
  console.log(`Bot's Discord Tag: ${bot.user.tag}`);
  console.log(`Bot's Discord ID: ${bot.user.id}`);
  console.log("==================================");

  bot.user.setActivity(PREFIX + "help");

});

bot.on("message", async (message) => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  let serverQueue = queue.get(message.guild.id);

  if (!message.content.startsWith(PREFIX)) {
    return;
  }
  const commandfile = bot.commands.get(cmd.slice(PREFIX.length).toLowerCase());
  if (commandfile) {
    let utils = {
      Discord: Discord,
      bot: bot,
      message: message,
      embeds: embeds,
      args: args,
      StringSimilarity: StringSimilarity,
      serverQueue: serverQueue,
      queue: queue,
      Ytdl: Ytdl,
      Ytsearch: Ytsearch,
      Spotify: Spotify,
      MySQL: MySQL,
      updateQueue: Utils.updateQueue,
      toPromise: Utils.toPromise
    };
    Utils.init(utils, message);
    commandfile.run(utils);
  }
});


bot.on("error", err => {

  console.log(err);

});

bot.login(tokenConfig.token);
