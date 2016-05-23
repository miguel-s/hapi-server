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
  password: 'y00y-00m3-m4k1-z00m-y00y-00m3-m4k1-z00m-',
  cookie: 'sid',
  redirectTo: '/login',
  isSecure: false, // // set 'false' for http! set 'true' for https!
};

internals.after = (server, next) => {
  // note! set server.app.cache which is catbox.cache.
  // see server.cache docs. read about catbox policy.
  const cache = server.cache(internals.options.cacheOptions);
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', true, {
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
