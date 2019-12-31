const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

const tokenConfig = require("./botConfig.js");

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

  jsfile.forEach((f, i) => {

      let props = require(`./commands/${f}`);

      console.log(`(Command) | ✅ -- ${f}`);

      bot.commands.set(props.help.name, props);

  });

});

fs.readdir("./listeners/", (err, file) => {

  if (err) console.log(err);

  let folders = file.filter(f => fs.lstatSync(`./listeners/${f}`).isDirectory());

  folders.forEach((listener, i) => {

    bot.on(listener, param => {

      fs.readdir(`./listeners/${listener}/`, (err2, file2) => {

        if (err2) console.log(err2);

        let jsfile = file2.filter(f => f.split(".").pop() === "js");

        jsfile.forEach((f, index) => {

          var command = require(`./listeners/${listener}/${f}`);

          var utils = {
            parameter: param,
            Discord: Discord,
            bot: bot
          }
          
          command(utils);

        })

      })

    });

  })

})



const PREFIX = '-';
const version = '1.1.1';

bot.on("ready", () => {
  console.log("==================================")
  console.log(`${bot.user.username} is online!`);
  console.log("==================================")
  console.log(`Bot\'s Information`)
  console.log("----------------------------------")
  console.log(`Bot\'s Name: ${bot.user.username}`)
  console.log(`Bot\'s Discord Tag: ${bot.user.tag}`)
  console.log(`Bot\'s Discord ID: ${bot.user.id}`)
  console.log("==================================")

  bot.user.setActivity(PREFIX + "help");

});

bot.on("message", async (message) => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();

  if (!message.content.startsWith(PREFIX)) {
    return;
  };
  commandfile = bot.commands.get(cmd.slice(PREFIX.length).toLowerCase());
  if (commandfile) {
    var utils = {
      Discord: Discord,
      bot: bot,
      message: message
    }
    commandfile.run(utils);
  };
  const arg = message.content.substring(PREFIX.length).split(" ");
});


bot.on("error", err => {

  console.log(err);

})

bot.login(tokenConfig.token);
