const Btoa = require("btoa");

function expressrouter(Express, NodeFetch) {

  const ExpressRouter = Express.Router();

  const botConfig = require("./../botConfig.js");

  const CLIENT_ID = botConfig.oauth2.CLIENT_ID;
  const CLIENT_SECRET = botConfig.oauth2.CLIENT_SECRET;
  const redirect = "http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fcallback";

  ExpressRouter.get("/login", (req, res) => {

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

    res.redirect(`/?token=${json.access_token}`);

  });

  return ExpressRouter;

}

module.exports = expressrouter;
