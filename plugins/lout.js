'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.register([require('vision'), require('inert'), { register: require('lout'), options: internals.options }], (err) => {
    if (err) return next(err);
    return next();
  });
};

exports.register.attributes = {
  name: 'Lout',
};

exports.options = internals.options = {
  auth: {
    strategy: 'server-session',
    mode: 'try',
    scope: ['admin'],
  },
};
