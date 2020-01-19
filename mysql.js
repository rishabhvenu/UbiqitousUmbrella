const mysql = require("mysql2");

const config = require("./botConfig.js");

let MySQL = {

  connection: mysql.createConnection({

    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database

  })

};

module.exports = MySQL;
