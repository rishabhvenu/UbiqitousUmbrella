const Discord = require("discord.js");
const fs = require("fs");
const StringSimilarity = require("string-similarity");
const Ytdl = require("ytdl-core");
const Ytsearch = require("yt-search");
const Spotify = require("spotify-web");

//Instantiating Discord Client
const bot = new Discord.Client();

//Setting local imports
const tokenConfig = require("./botConfig.js");
const embeds = require("./embeds.js");
const Utils = require("./utils.js");
const MySQL = require("./mysql.js");
const WebPanel = require("./WebPanel/webpanel.js");

//Setting a Discord Collection for the commands and prefixes and music queue
bot.commands = new Discord.Collection();
bot.prefixes = new Discord.Collection();
bot.queue = new Discord.Collection();

//Setting an interval to execute a MySQL statement every 2 statement so the server doesn't close
setInterval(() => MySQL.connection.execute("SELECT 1"), 120000);

//Reading the commands folder
fs.readdir("./commands/", (err, file) => {

  //Catching error3
  if (err) console.log(err);

  //Filtering out any file that isn't a javascript file
  let jsfile = file.filter(f => f.split(".").pop() === "js");

  //Creating a variable that each command can use
  let props;

  //Looping through all the javascript files
  jsfile.forEach(f => {

    //Setting variable to the current command
    props = require(`./commands/${f}`);

    //Logging the current command
    console.log(`(Command) | ✅ -- ${f}`);


    //Checking if the current command name is an array to determine if there are any aliases
    if (props.help.name instanceof Array) {

      //Looping through each alias and setting it as a command
      for (let alias in props.help.name) bot.commands.set(props.help.name[alias], props);

    //Setting the command with no alias
    } else bot.commands.set(props.help.name, props);

  });

});

//Reading the listeners folder
fs.readdir("./listeners/", (err, file) => {

  //Catching error
  if (err) console.log(err);

  //Filtering out anything that isn't a folder/directory
  let folders = file.filter(f => fs.lstatSync(`./listeners/${f}`).isDirectory());

  //Looping through each folder
  folders.forEach(listener => {

    //Registering the current event
    bot.on(listener, param => {

      //Reading the folder for the current listener
      fs.readdir(`./listeners/${listener}/`, (err2, file2) => {

        //Catching error
        if (err2) console.log(err2);

        //Filtering out any file that isn't a javascript file
        let jsfile = file2.filter(f => f.split(".").pop() === "js");

        //Creating a variable each file in the folder can use
        let command;

        //Looping through each file in the folder
        jsfile.forEach(f => {

          //Setting variable to current file name
          command = require(`./listeners/${listener}/${f}`);

          //Setting utilities the file can use
          let utils = {
            parameter: param,
            Discord: Discord,
            bot: bot,
            embeds: embeds,
            MySQL: MySQL
          };

          //Running the file
          command(utils);

        });

      });

    });

  });

});

//Registering ready event
bot.on("ready", () => {

  //Logging bot information
  console.log("==================================");
  console.log(`${bot.user.username} is online!`);
  console.log("==================================");
  console.log("Bot's Information");
  console.log("----------------------------------");
  console.log(`Bot's Name: ${bot.user.username}`);
  console.log(`Bot's Discord Tag: ${bot.user.tag}`);
  console.log(`Bot's Discord ID: ${bot.user.id}`);
  console.log("==================================");

  //Setting bot activity
  bot.user.setActivity(`over ${bot.guilds.size} guilds 👀`, {type: "WATCHING"});

});

//Registering message event
bot.on("message", async message => {

  //Ignore if message wasn't sent in a server
  if (!message.guild) return;

  //Checking if prefix wasn't already set for this guild
  if (!bot.prefixes.has(message.guild.id)) {

    //Getting settings data for this guild
    let settingsData = await MySQL.settingsData(message.guild.id);
    //Setting guild data if there is no settings data (Bot must have been invited when it was offline)
    if (!settingsData) await MySQL.setGuildData(message.guild);
    //Setting prefix for this guild
    bot.prefixes.set(message.guild.id, settingsData.prefix);

  }

  //Setting prefix
  const PREFIX = bot.prefixes.get(message.guild.id);
  //Ignore if message wasn't a command
  if (!message.content.startsWith(PREFIX)) return;
  //Setting array with command and arguments
  let messageArray = message.content.slice(PREFIX.length).split(" ");
  //Setting command
  let cmd = messageArray[0].toLowerCase();
  //Setting array with arguments
  let args = messageArray.slice(1);

  //Setting music queue for this guild
  let serverQueue = bot.queue.get(message.guild.id);

  const commandfile = bot.commands.get(cmd.toLowerCase());
  //Ignore if command isn't registered
  if (!commandfile) return;

  //Setting utilites for command
  let utils = {
    Discord: Discord,
    bot: bot,
    message: message,
    embeds: embeds,
    args: args,
    StringSimilarity: StringSimilarity,
    serverQueue: serverQueue,
    Ytdl: Ytdl,
    Ytsearch: Ytsearch,
    Spotify: Spotify,
    MySQL: MySQL,
    updateQueue: Utils.updateQueue,
    toPromise: Utils.toPromise
  };

  //Initiating use for functions in utilites
  Utils.init(utils, message);

  //Running the command file
  commandfile.run(utils);


  //Leveling stuff
  let createLevelingTable = "CREATE TABLE IF NOT EXISTS Leveling (userID varchar(18), XP int(255))";

  if (message.author.lastMessage) {
    if (Date.now() - message.author.lastMessage.createdTimestamp >= 1000) {

    }
  }

});

//Registering error event
bot.on("error", err => console.log(err));

//Logging into to bot with token from config
bot.login(tokenConfig.token);

//Running code for the web panel
WebPanel(bot);
