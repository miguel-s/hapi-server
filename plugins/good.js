'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.register({ register: require('good'), options: internals.options }, (err) => {
    if (err) return next(err);
    return next();
  });
};

exports.register.attributes = {
  name: 'Good',
};

exports.options = internals.options = {
  ops: {
    interval: 30000,
  },
  reporters: {
    console: [
      { module: 'good-console' },
      'stdout',
    ],
  },
};
