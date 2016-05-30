'use strict';

const sqlite3 = require('sqlite3').verbose();

const internals = {};

exports.register = (server, options, next) => {
  const web = server.select('web');

  web.ext('onPreStart', (request, reply) => {
    web.app.db = new sqlite3.Database('database.db');
    return reply();
  });

  web.ext('onPreStop', (request, reply) => {
    if (!web.app.db) return reply();
    web.app.db.close((err) => {
      if (err) return reply(err);
      return reply();
    });
  });
  return next();
};

exports.register.attributes = {
  name: 'Database',
};
