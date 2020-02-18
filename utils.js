let Utils = {

  utils: null,
  message: null,
  init: (utils, message) => {

    Utils.utils = utils;
    Utils.message = message;

  },

  updateQueue: servQueue => {

    Utils.utils.serverQueue = servQueue;

    Utils.utils.bot.queue.set(Utils.message.guild.id, servQueue);

  },

  toPromise: (context, callback, ...args) => {

    return new Promise((resolve, reject) => {

      args.push((err, data) => {

        if (err) reject(err);
        else resolve(data);

      });

      if (context) callback.call(context, ...args);
      else callback(...args);

    });

  }

};

module.exports = Utils;
