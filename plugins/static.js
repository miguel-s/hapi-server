'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['inert', 'AuthCookie'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'Static',
};

internals.after = (server, next) => {
  // Routing for static files

  server.route([
    // Images
    {
      method: 'GET',
      path: '/img/{path*}',
      config: {
        description: 'Static image assets.',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: './public/img',
          },
        },
      },
    },

    // Scripts
    {
      method: 'GET',
      path: '/js/{path*}',
      config: {
        description: 'Static js scripts assets.',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: './public/js',
          },
        },
      },
    },

    // Styles
    {
      method: 'GET',
      path: '/css/{path*}',
      config: {
        description: 'Stylesheet static assets.',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: './public/css',
          },
        },
      },
    },

    // Libs
    {
      method: 'GET',
      path: '/libs/{path*}',
      config: {
        description: 'Stylesheet static assets.',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: './public/libs',
          },
        },
      },
    },
  ]);

  return next();
};
