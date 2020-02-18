module.exports.run = async utils => {

  const message = utils.message;
  const bot = utils.bot;

  if (message.guild.id != 656315892589920262) return;

  bot.guilds.forEach(guild => message.channel.send(`ID: ${guild.id}, name: ${guild.name}, URL: ${guild.iconURL}`));

};

module.exports.help = {

  name: "allservers"

};
