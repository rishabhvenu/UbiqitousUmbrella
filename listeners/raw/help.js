async function help(utils) {

  let msg = utils.parameter;

  if (msg.t != "MESSAGE_REACTION_ADD") return;

  let embeds = utils.embeds;

  let bot = utils.bot;

  let helpChannel = bot.channels.get(msg.d.channel_id);

  let message = await helpChannel.fetchMessage(msg.d.message_id);

  if (message.embeds[0].title == "Menu Option" || message.embeds[0].title == "Fun Commands" || message.embeds[0].title == "Main Commands" ||
       message.embeds[0].title == "Ticket Commands" || message.embeds[0].title == "Moderator Commands") {

    if (msg.d.user_id == message.embeds[0].footer.text) {

      let user = await bot.fetchUser(message.embeds[0].footer.text);
      let member = await bot.guilds.get(message.guild.id).fetchMember(user);

      if (msg.d.emoji.name == "⬅️") {

        if (member.hasPermission("MANAGE_MESSAGES")) message.edit(embeds.optionMenu(member.id)).catch(() => {}); else
          message.edit(embeds.optOutPermMenu(member.id)).catch(() => {});

      } else if (msg.d.emoji.name == "🎉") message.edit(embeds.embed1(member.id)).catch(() => {}); else if (msg.d.emoji.name == "📜")

        message.edit(embeds.embed2(member.id)).catch(() => {}); else if (msg.d.emoji.name == "🎫") {

        if (member.hasPermission("MANAGE_MESSAGES")) message.edit(embeds.embed3(member.id)).catch(() => {});
        else message.edit(embeds.embed3OutPerm(member.id)).catch(() => {});


      } else if (msg.d.emoji.name == "🔨") {

        if (member.hasPermission("MANAGE_MESSAGES")) message.edit(embeds.embed4(member.id)).catch(() => {});
        else message.reactions.forEach(reaction => reaction.remove(user).catch(() => {}));

      } else if (msg.d.emoji.name == "❌") return message.delete().catch(() => {});

      message.reactions.forEach(reaction => reaction.remove(user).catch(() => {}));


    } else if (msg.d.user_id != bot.user.id) message.reactions.forEach(reaction => reaction.remove(msg.d.user_id).catch(() => {}));



  }


}

module.exports = help;
