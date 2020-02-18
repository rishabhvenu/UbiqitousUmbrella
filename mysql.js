const mysql = require("mysql2");

const config = require("./botConfig.js");

let MySQL = {

  connection: mysql.createConnection({

    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database

  }),

  cmdsEnabled: async guildid => {

    let querySQL = "SELECT enableSettings FROM Settings WHERE serverID = ?";

    let enableSettingsData = await MySQL.connection.promise().execute(querySQL, [guildid]);
    return enableSettingsData[0][0].enableSettings;

  },

  settingsData: async guildid => {

    let querySQL = "SELECT * FROM Settings WHERE serverID = ?";

    let settingsData = await MySQL.connection.promise().execute(querySQL, [guildid]);
    return settingsData[0][0];

  },

  setGuildData: async guild => {

    //SQL STATEMENTS
    let createSettingsTableSQL = "CREATE TABLE IF NOT EXISTS Settings (serverID varchar(18), prefix varchar(255), enableSettings JSON)";
    let checkIfGuildInDataSQL = "SELECT count(*) as total FROM Settings WHERE serverID = ?";
    let insertGuildDataSQL = "INSERT INTO Settings (serverID, prefix, enableSettings) VALUES (?, ?, ?)";

    MySQL.connection.connect();
    MySQL.connection.execute(createSettingsTableSQL);

    let haveGuildData = await MySQL.connection.promise().execute(checkIfGuildInDataSQL, [guild.id]);

    if (haveGuildData[0][0].total < 1) MySQL.connection.execute(insertGuildDataSQL, [guild.id, "-", JSON.stringify({ticket: true, music: true, moderation: true, logs: false})]);

  }


};

module.exports = MySQL;
