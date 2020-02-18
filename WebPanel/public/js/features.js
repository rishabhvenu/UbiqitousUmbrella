/* eslint-env jquery, browser */

function checkSettings(enableSettings) {

  if (enableSettings.ticket) $("#ticket").prop("checked", true);
  if (enableSettings.music) $("#music").prop("checked", true);
  if (enableSettings.moderation) $("#moderation").prop("checked", true);
  if (enableSettings.logs) $("#logs").prop("checked", true);

}

function main(enableSettings, guildid) {  // eslint-disable-line no-unused-vars

  checkSettings(enableSettings);

  $(document).ready(() => {

    let socket = io(); // eslint-disable-line no-undef

    $(":checkbox").change(() => socket.emit("change enable settings",
      {logs: $("#logs")[0].checked, ticket: $("#ticket")[0].checked, music: $("#music")[0].checked, moderation: $("#moderation")[0].checked}, guildid));

  });
}
