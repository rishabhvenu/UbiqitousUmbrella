const Express = require("express");
const ExpressApp = Express();
const ExpressSession = require("express-session");
const HttpServer = require("http").createServer(ExpressApp);
const NodeFetch = require("node-fetch");
const MySQL = require("./../mysql.js");
const SocketIO = require("socket.io")(HttpServer);
const Path = require("path");

const fetchHeaders = req => {
  return {
    headers: {
      Authorization: `Bearer ${req.session.access_token}`
    }
  };
};

const sockets = require("./socketiosockets.js");
const botConfig = require("./../botConfig.js");

function webpanel(bot) {

  const port = 80;

  const Oauth2ExpressRouter = require("./routers/discordapirouter.js")(Express, NodeFetch, botConfig, fetchHeaders);
  const DashboardExpressRouter  = require("./routers/dashboardrouter.js")(Express, NodeFetch, MySQL, bot, botConfig, fetchHeaders);

  ExpressApp.set("view engine", "ejs");
  ExpressApp.set("views", Path.join(__dirname, "views"));

  ExpressApp.use(ExpressSession({secret: "supahsecretocodeo", cookie: {maxAge: 21600000}})); //max age is 6 hours
  ExpressApp.use("/static", Express.static(Path.join(__dirname, "public")));
  ExpressApp.use("/api/discord", Oauth2ExpressRouter);
  ExpressApp.use("/dashboard", DashboardExpressRouter);

  ExpressApp.get("/", async (req, res) => {

    if (req.session.access_token) {

      res.render("pages/home", {userInfo: req.session.userInfo, loggedin: true});

    } else res.render("pages/home", {loggedin: false});

  });
  ExpressApp.get("/logout", (req, res) => {
    if (req.session.access_token) req.session.destroy();
    res.redirect("/");
  });
  ExpressApp.get("*", (req, res) => res.render("pages/404"));

  sockets(SocketIO, MySQL, bot);

  HttpServer.listen(port, () => console.log("Web Panel is up!"));

}

module.exports = webpanel;
