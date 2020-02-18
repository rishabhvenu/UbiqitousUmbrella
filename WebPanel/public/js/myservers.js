/* eslint-env browser */

function openwindow(url, guildid) { // eslint-disable-line no-unused-vars

  let newwindow = window.open(url, "Discord Authorization", "height=700,width=500,modal=yes,alwaysRaised=yes");

  setInterval(() => {
    if (newwindow.closed) window.location.href = `/dashboard/${guildid}`;
  }, 500);

}
