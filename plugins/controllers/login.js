'use strict';

const aguid = require('aguid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function handler(request, reply) {
  const prefix = request.route.realm.modifiers.route.prefix;
  let account = {};

  if (request.auth.isAuthenticated) {
    return reply.redirect(prefix);
  }

  if (!request.payload.email || !request.payload.password) {
    return reply.view('login', {
      message: 'Missing email or password',
      email: request.payload.email,
    });
  }

  // TODO:
  // Add if() Joi returns an error

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
        account.token = jwt.sign(
          { iat: Math.floor(Date.now() / 1000), jti: aguid(), id: row.id },
          process.env.JWT_SECRET
        );
        if (account.password) delete account.password; // don't save pw in cookie
        const sid = String(aguid());
        request.server.app.cache.set(sid, { account }, 0, (err) => {
          if (err) return reply(err);

          request.cookieAuth.set({ sid });

          if (account.scope.indexOf('admin') !== -1) {
            return reply.redirect(prefix);
          }

          return reply.redirect(prefix);
        });
      });
    }
  );
};
