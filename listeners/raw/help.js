function help(utils) {

  var msg = utils.parameter;

  if (msg.t != "MESSAGE_REACTION_ADD" && msg.t != "MESSAGE_REACTION_REMOVE") {

    return;

  }

  var embeds = utils.embeds;

  if (msg.t == "MESSAGE_REACTION_ADD") {

    var bot = utils.bot;

    var helpChannel = bot.channels.get(msg.d.channel_id);

    helpChannel.fetchMessage(msg.d.message_id).then(message => {

      if (message.embeds[0].title == "Menu Option" || message.embeds[0].title == "Fun Commands" || message.embeds[0].title == "Main Commands" ||
         message.embeds[0].title == "Ticket Commands" || message.embeds[0].title == "Moderator Commands") {

        if (msg.d.user_id == message.embeds[0].footer.text) {

          bot.fetchUser(message.embeds[0].footer.text).then(user => {

            bot.guilds.first().fetchMember(user).then(member => {

              if (msg.d.emoji.name == "⬅️") {

                if (member.hasPermission("MANAGE_MESSAGES")) {

                  message.edit(embeds.optionMenu(member.id)).catch(() => {});

                } else {

                  message.edit(embeds.optOutPermMenu(member.id)).catch(() => {});

                }

              } else if (msg.d.emoji.name == "🎉") {

                message.edit(embeds.embed1(member.id)).catch(() => {});

              } else if (msg.d.emoji.name == "📜") {

                message.edit(embeds.embed2(member.id)).catch(() => {});

              } else if (msg.d.emoji.name == "🎫") {

                if (member.hasPermission("MANAGE_MESSAGES")) {

                  message.edit(embeds.embed3(member.id)).catch(() => {});

                } else {

                  message.edit(embeds.embed3OutPerm(member.id)).catch(() => {});

                }

              } else if (msg.d.emoji.name == "🔨") {

                if (member.hasPermission("MANAGE_MESSAGES")) {

                  message.edit(embeds.embed4(member.id)).catch(() => {});

                }

              } else if (msg.d.emoji.name == "❌") {

                message.delete().catch(() => {});
                return;

              }

              message.reactions.forEach(reaction => {

                reaction.remove(user).catch(() => {});

              });

            });

          });

        } else if (msg.d.user_id != 661359445388951555) {

          message.reactions.forEach(reaction => {

            reaction.remove(msg.d.user_id).catch(() => {});

          });

        }

      }

    });

  }


}

module.exports = help;
