/* eslint-env browser, jquery */

//Google Analytics Code
window.dataLayer = window.dataLayer || [];

function gtag() {window.dataLayer.push(arguments);}

gtag("js", new Date());
gtag("config", "UA-158080257-1");

$(document).ready(() => {

  $("#collapse_target").on("shown.bs.collapse", () => $("#dashboardmenubar").css("top", "220px"));
  $("#collapse_target").on("show.bs.collapse", () => {

    $("#collapsebutton").html("<i class=\"fa fa-times\"></i>");
    $("#discord-login").css("visibility", "hidden");
    $("#menubarheader").html("UbiqitousUmbrella");

  });
  $("#collapse_target").on("hide.bs.collapse", () => {

    $("#dashboardmenubar").css("top", "0px");
    $("#collapsebutton").html("<i class=\"navbar-toggler-icon\"></i>");

  });
  $("#collapse_target").on("hidden.bs.collapse", () => {

    $("#discord-login").css("visibility", "visible");

  });

});
