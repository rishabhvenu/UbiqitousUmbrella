module.exports.run = async utils => {

  let message = utils.message;
  let args = utils.args;
  let embeds = utils.embeds;

  let MySQL = utils.MySQL;

  message.delete();

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.nowarnpermmoderation(message.author.tag));

  if (args.length < 1) return message.channel.send(embeds.wrongwarnusagemoderation(message.author.tag));

  let warnUser;

  if (message.mentions.members.first()) {

    warnUser = message.mentions.members.first();

    if (!message.guild.members.has(warnUser.user.id) || warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeds.nopermwarnmoderation(message.author.tag));

  } else {

    let usersArray = [];

    message.guild.members.filter(member => !member.hasPermission("MANAGE_MESSAGES")).tap(user => usersArray.push(user.user.tag));

    if (usersArray.length < 1) return message.channel.send(embeds.nouserwarnmoderation(message.author.tag));

    warnUser = message.guild.members.find(m => m.user.tag === utils.StringSimilarity.findBestMatch(args[0], usersArray).bestMatch.target);

  }

  //SQL STATEMENTS
  let createWarnTableSQL = "CREATE TABLE IF NOT EXISTS Warns (serverID varchar(18), users JSON)";
  let checkServerWarnDataExistsSQL = "SELECT * FROM Warns WHERE serverID = ?";
  let insertWarnFirstTimeDataSQL = "INSERT INTO Warns (serverID, users) VALUES (?, ?)";
  let getWarnUserDataSQL = "SELECT users FROM Warns WHERE serverID = ?";
  let setWarnUserDataSQL = "UPDATE Warns SET users = ? WHERE serverID = ?";
  let deleteWarnServerDataSQL = "DELETE FROM Wa5rns WHERE serverID = ?";

  let lastStrike = false;

  MySQL.connection.connect();
  MySQL.connection.execute(createWarnTableSQL);

  let serverDataResults = await MySQL.connection.promise().execute(checkServerWarnDataExistsSQL, [message.guild.id]);

  if (serverDataResults[0].length > 0) {

    let warnUserDataResults = await MySQL.connection.promise().execute(getWarnUserDataSQL, [message.guild.id]);

    let userData = warnUserDataResults[0][0].users;

    if (userData[warnUser.user.id]) userData[warnUser.user.id] += 1; else userData[warnUser.user.id] = 1;

    if (userData[warnUser.user.id] > 2) {

      message.guild.ban(warnUser.user.id);

      delete userData[warnUser.user.id];

      if (Object.entries(userData).length == 0) {

        MySQL.connection.execute(deleteWarnServerDataSQL, [message.guild.id]);

        lastStrike = true;

      }

    }

    MySQL.connection.execute(setWarnUserDataSQL, [JSON.stringify(userData), message.guild.id]);

  } else MySQL.connection.execute(insertWarnFirstTimeDataSQL, [message.guild.id, `{"${warnUser.user.id}": 1}`]);

  if (lastStrike) message.channel.send(embeds.successwarnuserlaststrikemoderation(message.author.tag, warnUser.user.id, warnUser.user.username, warnUser.user.avatarURL)); else
    message.channel.send(embeds.successwarnusermoderation(message.author.tag, warnUser.user.id, warnUser.user.username, warnUser.user.avatarURL));

};

module.exports.help = {

  name: "warn"

};
