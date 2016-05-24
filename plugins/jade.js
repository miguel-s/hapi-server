'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['vision'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'Jade',
};

exports.options = internals.options = {
  engines: {
    jade: {
      module: require('jade'),
      // set 'false' for development! set 'true' for production!
      isCached: true, // (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'),
    },
  },
  relativeTo: __dirname,
  path: '../views',
};

internals.after = (server, next) => {
  server.root.views(internals.options);
  return next();
};
