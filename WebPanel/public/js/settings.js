/* eslint-env jquery, browser */

function main(guildid) { // eslint-disable-line no-unused-vars

  $(document).ready(() => {

    let socket = io(); // eslint-disable-line no-undef

    $("#savebutton").click(() => $("#savechangesmodal").modal("show"));
    $("#savebuttonconfirm").click(() => socket.emit("change guild settings", {prefix: $("#prefixinput").val()}, guildid));

  });

}
