function expressrouter(Express, NodeFetch, MySQL, bot, botConfig, fetchHeaders) {

  const ExpressRouter = Express.Router();

  ExpressRouter.get("/", async (req, res) => {

    if (req.session.access_token) {

      let userInfo = await NodeFetch("https://discordapp.com/api/v6/users/@me/guilds", fetchHeaders(req));

      userInfo = await userInfo.json();

      if (userInfo.message && userInfo.message == "You are being rate limited.") res.redirect("/dashboard");
      else {
        let addableGuilds = userInfo.filter(guild => guild.owner || (guild.permissions & 0x8));

        let editableGuilds = [];
        let setupGuilds = [];

        addableGuilds.forEach(guild => {
          if (bot.guilds.has(guild.id)) {

            let newguild = bot.guilds.get(guild.id);
            editableGuilds.push({setup: false, guild: newguild});

          } else {
            let redirect_uri = "https%3A%2F%2Fubiqitousumbrella.ragearcade.org%2Fapi%2Fdiscord%2Fclose";
            let url = `https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=${botConfig.oauth2.CLIENT_ID}&permissions=8&scope=bot&redirect_uri=${redirect_uri}&guild_id=${guild.id}`;
            setupGuilds.push({setup: true, guild: guild, url: url});
          }
        });

        const sortFunc = (guild, guild2) => guild.guild.name.localeCompare(guild2.guild.name);

        editableGuilds.sort(sortFunc);
        setupGuilds.sort(sortFunc);

        addableGuilds = editableGuilds.concat(setupGuilds);

        res.render("pages/myservers", {userInfo: req.session.userInfo, loggedin: true, guilds: addableGuilds});
      }
    } else {

      if (req.query.redirect) res.redirect(`/api/discord/login?redirect=${req.query.redirect}`);
      else res.redirect("/api/discord/login");
    }

  });

  ExpressRouter.get("/:guildid", async (req, res) => {

    if (req.session.access_token) {

      if (bot.guilds.has(req.params.guildid)) {

        let enableSettings = await MySQL.cmdsEnabled(req.params.guildid);

        res.render("pages/features", {loggedin: true, userInfo: req.session.userInfo, guild: bot.guilds.get(req.params.guildid), enableSettings: enableSettings});

      }
      else res.redirect("/dashboard");

    } else res.redirect(`/dashboard?redirect=%2Fdashboard%2F${req.params.guildid}`);

  });

  ExpressRouter.get("/:guildid/settings", async (req, res) => {

    if (req.session.access_token) {

      if (bot.guilds.has(req.params.guildid)) {

        let settingsData = await MySQL.settingsData(req.params.guildid);
        res.render("pages/settings", {loggedin: true, userInfo: req.session.userInfo, guild: bot.guilds.get(req.params.guildid), settingsData: settingsData});

      }
      else res.redirect("/dashboard");

    }
    else res.redirect(`/dashboard?redirect=%2Fdashboard%2F${req.params.guildid}%2Fsettings`);

  });

  return ExpressRouter;

}
module.exports = expressrouter;
