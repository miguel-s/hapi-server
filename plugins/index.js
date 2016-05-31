'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['Jade'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'Index',
};

internals.after = (server, next) => {
  // MSAH routing

  server.route([
    // User route
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'Returns the index page',
        handler: {
          view: {
            template: 'index',
          },
        },
      },
    },
  ]);

  return next();
};
