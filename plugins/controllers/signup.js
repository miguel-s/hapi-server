'use strict';

const aguid = require('aguid');

module.exports = function handler(request, reply, source, error) {
  let account = {};

  if (request.auth.isAuthenticated) {
    return reply.redirect('/dashboard');
  }

  // const key = error.data.details[0].path;
  // const err = {};
  // err[key] = {
  //   class: 'input-error', // css class
  //   message: error.data.details[0].message, // Joi error message
  // };

  if (!request.payload.email || !request.payload.password) {
    return reply.view('signup', {
      message: 'Missing email or password',
      email: request.payload.email,
    });
  }
  request.server.app.db.get('SELECT * FROM Users WHERE email = ?', request.payload.email,
    (err, row) => {
      if (err) return reply(err);
      if (row) {
        return reply.view('signup', {
          message: 'User already exists',
          email: request.payload.email,
        });
      }

      // TODO:
      // add Joi validation for payload
      account = {
        id: aguid(request.payload.email),
        username: null,
        password: request.payload.password,
        email: request.payload.email,
        scope: 'user',
      };
      request.server.app.db.run(
        'INSERT INTO Users (id, username, password, email, scope) VALUES (?, ?, ?, ?, ?)',
        account.id,
        account.username,
        account.password,
        account.email,
        account.scope,
        (err) => {
          if (err) return reply(err);
          const sid = String(aguid());
          request.server.app.cache.set(sid, { account }, 0, (err) => {
            if (err) return reply(err);
            request.cookieAuth.set({ sid });
            return reply.redirect('/dashboard');
          });
        }
      );
    }
  );
};
