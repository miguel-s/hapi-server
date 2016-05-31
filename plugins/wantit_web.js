'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['Jade', 'AuthCookie'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'Wantit-web',
};

exports.options = internals.options = {
  prefix: '/wantit',
};

internals.after = (server, next) => {
  // Web routing

  server.route([
    // Index route
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'Returns the index page',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: `${internals.options.prefix}/login` } },
        handler: {
          view: {
            template: 'wantit',
            context: { prefix: internals.options.prefix },
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
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          view: {
            template: 'login',
            context: { prefix: internals.options.prefix },
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/login',
      config: {
        description: 'Returns a login form',
        auth: { strategy: 'session', mode: 'try' },
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
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: {
          view: {
            template: 'signup',
            context: { prefix: internals.options.prefix },
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/signup',
      config: {
        description: 'Returns a sinup form',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        validate: {
          payload: require('./models/user.js'),
          failAction: require('./controllers/signup.js'),
        },
        handler: require('./controllers/signup.js'),
      },
    },

    // Dashboard route
    {
      method: 'GET',
      path: '/dashboard',
      config: {
        description: 'Returns the dashboard page',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: `${internals.options.prefix}/login` } },
        handler: {
          view: {
            template: 'dashboard',
            context: { prefix: internals.options.prefix },
          },
        },
      },
    },

    // Profile route
    {
      method: 'GET',
      path: '/profile',
      config: {
        description: 'Returns the profile page',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: `${internals.options.prefix}/login` } },
        handler: require('./controllers/profile.js'),
      },
    },

    // Cookies route
    {
      method: 'GET',
      path: '/cookies',
      config: {
        description: 'Returns the cookies policy page',
        auth: { strategy: 'session', mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: `${internals.options.prefix}/login` } },
        handler: {
          view: {
            template: 'cookies',
            context: { prefix: internals.options.prefix },
          },
        },
      },
    },

    // Admin route
    {
      method: 'GET',
      path: '/admin',
      config: {
        description: 'Returns the admin control panel',
        auth: { strategy: 'session', mode: 'try', scope: ['admin'] },
        plugins: { 'hapi-auth-cookie': { redirectTo: `${internals.options.prefix}/login` } },
        handler: {
          view: {
            template: 'admin',
            context: { prefix: internals.options.prefix },
          },
        },
      },
    },
  ]);

  return next();
};
