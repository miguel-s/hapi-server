'use strict';

const Boom = require('boom');
const Joi = require('joi');

const internals = {};

exports.register = (server, options, next) => {
  const heroku = server.select('heroku');

  // Handle Bad Route Attempt
  heroku.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) {
      // statusCode 404 Not Found
      if (request.response.output.statusCode === 404) {
        return reply.view('error', {
          statusCode: request.response.output.statusCode,
          error: request.response.output.payload.error,
        }).code(404);
      }
    }

    return reply.continue();
  });

  // Handle Forbidden
  heroku.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) {
      // statusCode 404 Not Found
      if (request.response.output.statusCode === 403) {
        return reply.view('error', {
          statusCode: 404,
          error: 'Not Found',
        }).code(404);
      }
    }

    return reply.continue();
  });

  // Handle Internal Server Error
  heroku.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) {
      // statusCode 500 Internal Server Error
      if (request.response.output.statusCode === 500) {
        return reply.view('error', {
          statusCode: request.response.output.statusCode,
          error: request.response.output.payload.error,
        });
      }
    }

    return reply.continue();
  });

  // Handle Bad Request
  heroku.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) {
      // statusCode 400 Bad Request
      if (request.response.output.statusCode === 400) {
        // "The server cannot or will not process the request due to something that is perceived to be a client error
        // (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
        return reply(Boom.badRequest('Malformed Data Entered'));
      }

      // Catch hapi-auth-cookie insufficient scope responses.
      const schema = Joi.string().regex(/^Insufficient scope/);
      const result = Joi.validate(request.response.message, schema);

      if (result.error === null) {
        return reply.redirect(`${heroku.info.uri}`);
      }
    }

    return reply.continue();
  });
  return next();
};

exports.register.attributes = {
  name: 'WantitErrors',
};
