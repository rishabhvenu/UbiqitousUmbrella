async function addGuildData(utils) {

  let guild = utils.parameter;
  let MySQL = utils.MySQL;

  await MySQL.setGuildData(guild);

}

module.exports = addGuildData;
