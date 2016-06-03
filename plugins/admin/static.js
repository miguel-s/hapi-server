'use strict';

const path = require('path');

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['inert', 'AdminAuthCookie'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'ServerStatic',
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
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: path.join(__dirname, 'public/img'),
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
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: path.join(__dirname, 'public/js'),
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
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: path.join(__dirname, 'public/css'),
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
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          directory: {
            path: path.join(__dirname, 'public/libs'),
          },
        },
      },
    },
  ]);

  return next();
};
