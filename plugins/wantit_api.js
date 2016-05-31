'use strict';

const Boom = require('boom');
const Joi = require('joi');

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(['AuthJwt'], internals.after);
  return next();
};

exports.register.attributes = {
  name: 'Wantit-api',
};

internals.after = (server, next) => {
  // Api routing

  server.route([
    // User route
    {
      method: 'GET',
      path: '/v1/user/{id}',
      config: {
        description: 'Returns a user json object',
        auth: { strategy: 'token', mode: 'required' },
        validate: {
          params: {
            id: Joi.string().length(36),
          },
        },
        handler(request, reply) {
          request.server.app.db.get('SELECT id, username, email FROM Users WHERE id = ?',
            request.params.id,
            (err, row) => {
              if (err) return reply(Boom.badImplementation());
              if (!row) return reply(Boom.notFound());
              return reply(row);
            }
          );
        },
      },
    },

  ]);

  return next();
};
