'use strict';

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['hapi-auth-cookie'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'AuthCookie',
};

exports.options = internals.options = {
  cacheOptions: { segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 },
  password: process.env.COOKIE_SECRET,
  cookie: 'sid',
  redirectTo: '/login',
  isSecure: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'),
};

internals.after = (server, next) => {
  const cache = server.cache(internals.options.cacheOptions);
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', false, {
    password: internals.options.password, // must be length 32 hapi v13 requirement.
    cookie: internals.options.cookie,
    redirectTo: internals.options.redirectTo,
    isSecure: internals.options.isSecure,
    validateFunc: (request, session, callback) => {
      server.app.cache.get(session.sid, (err, cached) => {
        if (err) return callback(err, false);

        // session expired exception.
        if (!cached) return callback(null, false);

        return callback(null, true, cached.account);
      });
    },
  });

  return next();
};
