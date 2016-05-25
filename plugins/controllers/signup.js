'use strict';

const aguid = require('aguid');
const bcrypt = require('bcryptjs');

module.exports = function handler(request, reply, source, error) {
  let account = {};

  if (!request.server.app.settings.allowSignup) {
    return reply.view('signup', {
      message: 'Signup not allowed',
      email: request.payload.email,
    });
  }

  if (request.auth.isAuthenticated) {
    return reply.redirect('/admin');
  }

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

      bcrypt.genSalt(12, (err, salt) => {
        if (err) return reply(err);
        bcrypt.hash(request.payload.password, salt, (err, hash) => {
          if (err) return reply(err);
          account = {
            id: aguid(request.payload.email),
            username: null,
            password: hash,
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
                return reply.redirect('/admin');
              });
            }
          );
        });
      });
    }
  );
};
