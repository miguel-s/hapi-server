'use strict';

const internals = {};

exports.register = (server, options, next) => {
  const web = server.select('web');
  // const webTls = server.select('web-tls');

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    // TLS everything
    web.ext('onRequest', (request, reply) => {
      if (request.headers['x-forwarded-proto'] === 'http') {
        return reply.redirect(`https://${request.headers.host}${request.url.path}`).permanent();
      }
      return reply.continue();
    });
    return next();
  }
};

exports.register.attributes = {
  name: 'Tls',
};
