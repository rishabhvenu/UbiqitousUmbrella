function tdelete(utils) {

  var msg = utils.parameter;
  var embeds = utils.embeds;

  if (msg.t != "MESSAGE_REACTION_ADD") {

    return;

  }

  var bot = utils.bot;

  var ticketChannel = bot.channels.get(msg.d.channel_id);

  if (ticketChannel.name.split("-")[1] === "ticket") {

    if (ticketChannel.name.split("-")[0] === msg.d.user_id) {

      ticketChannel.fetchMessage(msg.d.message_id).then(message => {

        if (message.embeds[0].description ===
          "Are you sure you want to delete this ticket? You have 30 seconds to respond with ✅ for yes or ❌ for no.") {

          if (msg.d.emoji.name == "✅") {

            message.channel.delete();

            bot.fetchUser(msg.d.user_id).then(user => {

              user.createDM().then(dm => {

                dm.send(embeds.successcloseticket(user.tag));

              });

            });

          } else if (msg.d.emoji.name == "❌") {

            bot.fetchUser(msg.d.user_id).then(user => {

              message.edit(embeds.canceleddeleteticket(user.tag));

            });

          } else {

            message.reactions.forEach(reaction => {

              reaction.remove(msg.d.user_id).catch(() => {});

            });

          }

        }

      });

    } else if (msg.d.user_id != 661359445388951555) {

      ticketChannel.fetchMessage(msg.d.message_id).then(message => {

        message.reactions.forEach(reaction => {

          reaction.remove(msg.d.user_id).catch(() => {});

        });

      });

    }

  }

}

module.exports = tdelete;
