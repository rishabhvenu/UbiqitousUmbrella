function addGuildData(utils) {

  let guild = utils.parameter;

  let MySQL = utils.MySQL;

  //SQL STATEMENTS
  let createSettingsTable = "CREATE TABLE IF NOT EXISTS Settings (serverID varchar(18), prefix varchar(255), enableSettings JSON)";
  let insertGuildData = "INSERT INTO Settings (serverID, prefix, enableSettings) VALUES (?, ?, ?)";

  MySQL.connection.connect();
  MySQL.connection.execute(createSettingsTable);
  MySQL.connection.execute(insertGuildData, [guild.id, "-", JSON.stringify({ticket: true, music: true, moderation: true, logs: false})]);

  MySQL.cmdsEnabled(guild.id);



}

module.exports = addGuildData;
