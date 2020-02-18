function sockets(SocketIO, MySQL, bot) {

  SocketIO.on("connection", socket => {

    socket.on("change enable settings",  async (enableSettings, guildid) => {

      let updateSettingsData = "UPDATE Settings SET enableSettings = ? WHERE serverID = ?;";

      MySQL.connection.execute(updateSettingsData, [JSON.stringify(enableSettings), guildid]);

    });

    socket.on("change guild settings", async (guildSettings, guildid) => {

      let updateGuildData = "UPDATE Settings SET prefix = ? WHERE serverID = ?;";

      MySQL.connection.execute(updateGuildData, [guildSettings.prefix, guildid]);

      bot.prefixes.set(guildid, guildSettings.prefix);

    });

  });

}

module.exports = sockets;
