'use strict';

const sqlite3 = require('sqlite3').verbose();

const internals = {};

exports.register = (server, options, next) => {
  const webTls = server.select('web-tls');

  webTls.ext('onPreStart', (request, reply) => {
    webTls.app.db = new sqlite3.Database('database.db');
    return reply();
  });

  webTls.ext('onPreStop', (request, reply) => {
    if (!webTls.app.db) return reply();
    webTls.app.db.close((err) => {
      if (err) return reply(err);
      return reply();
    });
  });
  return next();
};

exports.register.attributes = {
  name: 'Database',
};
