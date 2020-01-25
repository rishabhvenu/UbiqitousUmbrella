const Express = require("express");
const ExpressApp = Express();
const ExpressSession = require("express-session");
const NodeFetch = require("node-fetch");
const Path = require("path");

const Oauth2ExpressRouter = require("./discordapirouter.js")(Express, NodeFetch);

function webpanel(bot) {

  const port = 3000;

  const fetchHeaders = req => {
    return {
      headers: {
        Authorization: `Bearer ${req.session.access_token}`
      }
    };
  };

  ExpressApp.set("view engine", "ejs");
  ExpressApp.set("views", Path.join(__dirname, "views"));

  ExpressApp.use(ExpressSession({secret: "supahsecretocodeo", cookie: {maxAge: 21600000}})); //max age is 6 hours
  ExpressApp.use("/static", Express.static(Path.join(__dirname, "public")));
  ExpressApp.use("/api/discord", Oauth2ExpressRouter);

  ExpressApp.get("/", (req, res) => {

    if (req.session.access_token) res.redirect("/dashboard");
    else {

      if (req.query.token) {

        req.session.access_token = req.query.token;
        res.redirect("/dashboard");

      } else res.render("pages/home", {loggedin: false});

    }

  });
  ExpressApp.get("/dashboard", async (req, res) => {

    if (req.session.access_token) {

      if (req.session.userInfo) {

        res.render("pages/home", {userInfo: req.session.userInfo, loggedin: true});

      } else {

        let userInfo = await NodeFetch("https://discordapp.com/api/v6/users/@me", fetchHeaders(req));

        userInfo = await userInfo.json();

        req.session.userInfo = userInfo;

        res.render("pages/home", {userInfo: userInfo, loggedin: true});

      }

    }
    else res.redirect("/api/discord/login");

  });
  ExpressApp.get("/myservers", async (req, res) => {

    if (req.session.access_token) {

      let userInfo = await NodeFetch("https://discordapp.com/api/v6/users/@me/guilds", fetchHeaders(req));

      userInfo = await userInfo.json();

      let addableGuilds = userInfo.filter(guild => guild.owner || (guild.permissions & 0x8));

      let editableGuilds = [];
      let setupGuilds = [];

      addableGuilds.forEach(guild => {
        if (bot.guilds.has(guild.id)) editableGuilds.push({setup: false, guild: guild});
        else setupGuilds.push({setup: true, guild: guild});
      });

      addableGuilds = editableGuilds.concat(setupGuilds);

      res.render("pages/myservers", {userInfo: req.session.userInfo, loggedin: true, guilds: addableGuilds});


    } else res.redirect("/");

  });
  ExpressApp.get("/logout", (req, res) => {
    if (req.session.access_token) req.session.destroy();
    res.redirect("/");
  });
  ExpressApp.get("*", (req, res) => res.render("pages/404"));

  ExpressApp.listen(port, () => console.log("Web Panel is up!"));

}

module.exports = webpanel;
