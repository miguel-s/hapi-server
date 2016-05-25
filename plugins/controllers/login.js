'use strict';

const aguid = require('aguid');
const bcrypt = require('bcryptjs');

module.exports = function handler(request, reply) {
  let account = {};

  if (request.auth.isAuthenticated) {
    return reply.redirect('/admin');
  }

  if (!request.payload.email || !request.payload.password) {
    return reply.view('login', {
      message: 'Missing email or password',
      email: request.payload.email,
    });
  }

  request.server.app.db.get('SELECT * FROM Users WHERE email = ?', request.payload.email,
    (err, row) => {
      if (err) return reply(err);

      if (!row) {
        return reply.view('login', {
          message: 'Invalid email or password',
          email: request.payload.email,
        });
      }

      bcrypt.compare(request.payload.password, row.password, (err, res) => {
        if (err) return reply(err);

        if (!res) {
          return reply.view('login', {
            message: 'Invalid email or password',
            email: request.payload.email,
          });
        }

        account = Object.assign(account, row, { scope: row.scope.split(', ') });
        if (account.password) delete account.password; // don't save pw in cookie
        const sid = String(aguid());
        request.server.app.cache.set(sid, { account }, 0, (err) => {
          if (err) return reply(err);

          request.cookieAuth.set({ sid });

          if (account.scope.indexOf('admin') !== -1) {
            return reply.redirect('/admin');
          }

          return reply.redirect('/profile');
        });
      });
    }
  );
};
