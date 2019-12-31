const Discord = require("discord.js");

module.exports = {

  // Help Embeds
  optionMenu: new Discord.RichEmbed()
    .setColor("ffe8fe")
    .setTitle("Menu Option")
    .setDescription("⬅️ - Return back to this menu. \n" +
                        "🎉 - **Fun Commands** \n" +
                        "📜 - **Main Commands** \n" +
                        "🎫 - **Ticket Commands** \n" +
                        "🔨 - **Moderator Commands** \n" +
                        "❌ - Close the menu entirely.")
    .setTimestamp(),

  optOutPermMenu: new Discord.RichEmbed()
    .setColor("ffe8fe")
    .setTitle("Menu Option")
    .setDescription("⬅️ - Return back to this menu. \n" +
                            "🎉 - **Fun Commands** \n" +
                            "📜 - **Main Commands** \n" +
                            "🎫 - **Ticket Commands** \n" +
                            "❌ - Close the menu entirely.")
    .setTimestamp(),

  embed1: new Discord.RichEmbed()
    .setColor("ffe8fe")
    .setTitle("Fun Commands")
    .addField("**coinflip <Alias: cf>**", "coinflip -- Play a coinflip game.")
    .addField("**rps**", "rps -- Play rock, paper, scissors.")
    .addField("**love**", "love <Member> -- Show how much you love someone.")
    .addField("**pet**", "pet -- Shows a random cat/dog")
    .addField("**8ball**", "8ball -- Ask a question for a magical answer.")
    .setTimestamp(),

  embed2: new Discord.RichEmbed()
    .setColor("ffe8fe")
    .setTitle("Main Commands")
    .addField("**help**", "help -- Brings up the help menu prompt.")
    .addField("**user <Alias: whois>**", "user <Member> -- Displays user's information.")
    .addField("**ping <Alias: lag>**", "ping -- Display ping (ms).")
    .addField("**report**", "report <Message> -- Make a report.")
    .addField("**server**", "server -- Displays server's information.")
    .addField("**suggest**", "suggest <Message> -- Make a suggestion.")
    .setTimestamp(),

  embed3OutPerm: new Discord.RichEmbed()
    .setColor("ffe8fe")
    .setTitle("Ticket Commands")
    .addField("**tnew**", "tnew -- Create a new ticket.")
    .addField("**tdelete<Alias: td>**", "tdelete -- Delete your ticket.")
    .setTimestamp(),

  embed3: new Discord.RichEmbed()
    .setColor("ffe8fe")
    .setTitle("Ticket Commands")
    .addField("**tnew**", "tnew -- Create a new ticket.")
    .addField("**tdelete<Alias: td>**", "tdelete -- Delete your ticket.")
    .addField("**tadd**", "tadd <Member> -- Add a member to the ticket.")
    .addField("**tremove**", "tremove <Member> -- Remove a member from a ticket.")
    .addField("**tforce <Alias: tf>**", "tforce -- Force close a ticket.")
    .setTimestamp(),

  embed4: new Discord.RichEmbed()
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
    .setTimestamp(),


};
