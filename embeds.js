const Discord = require("discord.js");

var Embeds = {

  // Help Embeds
  optionMenu: id => {

    return new Discord.RichEmbed()
      .setColor("ffe8fe")
      .setTitle("Menu Option")
      .setDescription("⬅️ - Return back to this menu. \n" +
                        "🎉 - **Fun Commands** \n" +
                        "📜 - **Main Commands** \n" +
                        "🎫 - **Ticket Commands** \n" +
                        "🔨 - **Moderator Commands** \n" +
                        "❌ - Close the menu entirely.")
      .setTimestamp()
      .setFooter(id);

  },

  optOutPermMenu: id => {

    return Embeds.optionMenu(id).setDescription("⬅️ - Return back to this menu. \n" +
                                "🎉 - **Fun Commands** \n" +
                                "📜 - **Main Commands** \n" +
                                "🎫 - **Ticket Commands** \n" +
                                "❌ - Close the menu entirely.");

  },

  embed1: id => {

    return new Discord.RichEmbed()
      .setColor("ffe8fe")
      .setTitle("Fun Commands")
      .addField("**coinflip <Alias: cf>**", "coinflip -- Play a coinflip game.")
      .addField("**rps**", "rps -- Play rock, paper, scissors.")
      .addField("**love**", "love <Member> -- Show how much you love someone.")
      .addField("**pet**", "pet -- Shows a random cat/dog")
      .addField("**8ball**", "8ball -- Ask a question for a magical answer.")
      .setTimestamp()
      .setFooter(id);

  },

  embed2: id => {
    return new Discord.RichEmbed()
      .setColor("ffe8fe")
      .setTitle("Main Commands")
      .addField("**help**", "help -- Brings up the help menu prompt.")
      .addField("**user <Alias: whois>**", "user <Member> -- Displays user's information.")
      .addField("**ping <Alias: lag>**", "ping -- Display ping (ms).")
      .addField("**report**", "report <Message> -- Make a report.")
      .addField("**server**", "server -- Displays server's information.")
      .addField("**suggest**", "suggest <Message> -- Make a suggestion.")
      .setTimestamp()
      .setFooter(id);
  },

  embed3OutPerm: id => {

    return new Discord.RichEmbed()
      .setColor("ffe8fe")
      .setTitle("Ticket Commands")
      .addField("**tnew**", "tnew -- Create a new ticket.")
      .addField("**tdelete<Alias: td>**", "tdelete -- Delete your ticket.")
      .addField("**tadd**", "tadd <Member> -- Add a member to the ticket.")
      .addField("**tremove**", "tremove <Member> -- Remove a member from a ticket.")
      .setTimestamp()
      .setFooter(id);

  },

  embed3: id => {

    return Embeds.embed3OutPerm(id).addField("**tforce <Alias: tf>**", "tforce -- Force close a ticket.");

  },

  embed4: id => {

    return new Discord.RichEmbed()
      .setColor("ffe8fe")
      .setTitle("Moderator Commands")
      .addField("**announce**", "announce -- Send an announcement to the announcements channel.")
      .addField("**ban**", "ban <Member> -- Ban a member from the server.")
      .addField("**unban**", "unban <MemberID> -- Unban a member from the server.")
      .addField("**kick**", "Kick <Member> -- Kick a member from the server.")
      .addField("**restart <Alias: reload>**", "Reload the bot.")
      .addField("**purge <Alias: clear>**", "purge <amount> -- Clear an amount of messages (14 day limit.)")
      .addField("**say**", "say <Message> -- Send a message as the bot.")
      .addField("**addrole <Alias: addr>**", "addrole <Role> -- Add a role to a member")
      .addField("**removerole <Alias: rr>**", "removerole <Role> -- Remove a role from a member.")
      .setTimestamp()
      .setFooter(id);

  },

  //ticket stuff
  ticketexists: (tag, ticketid) => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription(`You already have a ticket open! You can access it by going to <#${ticketid}>`)
      .setTimestamp()
      .setFooter(tag);

  },

  ticketcreated: (tag, ticketid) => {

    return new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`You have successfully created a ticket! You can access it by going to <#${ticketid}>`)
      .setTimestamp()
      .setFooter(tag);

  },

  notinticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You are not in a ticket! You can create one by doing `-tnew`")
      .setTimestamp()
      .setFooter(tag);

  },

  nodeletepermticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You do not have permission to delete the ticket! You must be the owner of the ticket to delete it!")
      .setTimestamp()
      .setFooter(tag);

  },

  confirmdeleteticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_ORANGE")
      .setDescription("Are you sure you want to delete this ticket? You have 30 seconds to respond with ✅ for yes or ❌ for no.")
      .setTimestamp()
      .setFooter(tag);

  },

  successcloseticket: tag => {

    return new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription("You have successfully closed your ticket! You can create a new one by doing `-tnew`")
      .setTimestamp()
      .setFooter(tag);

  },

  ranoutoftimeticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You did not choose an option in time! You can delete this ticket by doing `-tdelete`")
      .setTimestamp()
      .setFooter(tag);

  },

  canceleddeleteticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You chose to not delete this ticket! You can delete this ticket by doing `-tdelete`")
      .setTimestamp()
      .setFooter(tag);

  },

  noaddpermticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You do not have permission to add a user to this ticket! You must be the owner of the ticket to add a user to it!")
      .setTimestamp()
      .setFooter(tag);

  },

  wrongaddusageticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You must specify a user to add to this ticket! Usage: -tadd `@user`")
      .setTimestamp()
      .setFooter(tag);

  },

  successuseraddticket: (tag, friendid, friendname) => {

    return new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`You have successfully added <@${friendid}> to this ticket! To remove <@${friendid}>, do \`-tremove @${friendname}\``)
      .setTimestamp()
      .setFooter(tag);

  },

  wrongremoveusageticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You must specify a user to remove from this ticket! Usage: -tremove `@user`")
      .setTimestamp()
      .setFooter(tag);

  },

  successuserremoveticket: (tag, friendid, friendname) => {

    return new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`You have successfully removed <@${friendid}> from this ticket! To add <@${friendid}>, do \`-tadd @${friendname}\``)
      .setTimestamp()
      .setFooter(tag);

  },

  nouserremoveticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("There are no users in this ticket that can be removed! You can add a user to this ticket by doing -tadd `@user`")
      .setTimestamp()
      .setFooter(tag);

  },

  forcecloseticket: tag => {

    return new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription("Your ticket has been successfully closed by a moderator! You can create a new one by doing `-tnew`")
      .setTimestamp()
      .setFooter(tag);

  },

  noforcepermticket: tag => {

    return new Discord.RichEmbed()
      .setColor("DARK_RED")
      .setDescription("You do not have permission to force close to this ticket! You must be an administrator to force close this ticket!")
      .setTimestamp()
      .setFooter(tag);

  }

};

module.exports = Embeds;
