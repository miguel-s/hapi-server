'use strict';

const sqlite3 = require('sqlite3').verbose();

const internals = {};

exports.register = (server, options, next) => {
  server.ext('onPreStart', (request, reply) => {
    server.app.db = new sqlite3.Database('database.db');
    return reply();
  });

  server.ext('onPreStop', (request, reply) => {
    if (!server.app.db) return reply();
    server.app.db.close((err) => {
      if (err) return reply(err);
      return reply();
    });
  });
  return next();
};

exports.register.attributes = {
  name: 'Database',
};
