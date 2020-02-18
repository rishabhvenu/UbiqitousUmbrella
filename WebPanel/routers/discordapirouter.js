const Btoa = require("btoa");

function expressrouter(Express, NodeFetch, botConfig, fetchHeaders) {

  const ExpressRouter = Express.Router();

  const CLIENT_ID = botConfig.oauth2.CLIENT_ID;
  const CLIENT_SECRET = botConfig.oauth2.CLIENT_SECRET;

  let redirect = "https%3A%2F%2Fubiqitousumbrella.ragearcade.org%2Fapi%2Fdiscord%2Fcallback";

  ExpressRouter.get("/login", (req, res) => {

    if (req.query.redirect) req.session.tempredirect = req.query.redirect;

    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds&response_type=code&redirect_uri=${redirect}`);

  });

  ExpressRouter.get("/callback", async (req, res)  => {

    if (!req.query.code) return res.redirect("/");

    const code = req.query.code;
    const creds = Btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const response = await NodeFetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });

    const json = await response.json();

    req.session.access_token = json.access_token;

    if (!req.session.userInfo) {

      let userInfo = await NodeFetch("https://discordapp.com/api/v6/users/@me", fetchHeaders(req));

      userInfo = await userInfo.json();

      req.session.userInfo = userInfo;

    }

    if (req.session.tempredirect) {

      res.redirect(decodeURIComponent(req.session.tempredirect));
      delete req.session.tempredirect;

    }
    else res.redirect("/dashboard");

  });

  ExpressRouter.get("/close", (req, res) => res.send("<script>window.close();</script>"));

  return ExpressRouter;

}

module.exports = expressrouter;
