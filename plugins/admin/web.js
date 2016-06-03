'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['vision', 'AdminAuthCookie'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'ServerWeb',
};

internals.after = (server, next) => {
  server.views({
    engines: {
      jade: {
        module: require('jade'),
        // set 'false' for development! set 'true' for production!
        isCached: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'),
      },
    },
    relativeTo: __dirname,
    path: 'views',
  });

  // MSAH routing
  server.route([
    // User route
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'Returns the index page',
        auth: { strategy: 'admin-session', mode: 'try' },
        handler: {
          view: {
            template: 'index',
          },
        },
      },
    },

    // Login route
    {
      method: 'GET',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          view: {
            template: 'login',
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        validate: {
          payload: require('./models/user.js'),
          failAction: require('./controllers/login.js'),
        },
        handler: require('./controllers/login.js'),
      },
    },

    // Logout route
    {
      method: 'GET',
      path: '/logout',
      config: {
        description: 'Logout user',
        handler: require('./controllers/logout.js'),
      },
    },

    // Signup route
    {
      method: 'GET',
      path: '/signup',
      config: {
        description: 'Returns a sinup form',
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          view: {
            template: 'signup',
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/signup',
      config: {
        description: 'Returns a sinup form',
        auth: { strategy: 'admin-session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        validate: {
          payload: require('./models/user.js'),
          failAction: require('./controllers/signup.js'),
        },
        handler: require('./controllers/signup.js'),
      },
    },
  ]);

  return next();
};
