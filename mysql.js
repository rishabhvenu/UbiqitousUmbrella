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

  }


};

module.exports = MySQL;
