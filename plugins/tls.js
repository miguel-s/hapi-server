'use strict';

const internals = {};

exports.register = (server, options, next) => {
  const web = server.select('web');
  const webTls = server.select('web-tls');

  // TLS everything
  web.ext('onRequest', (request, reply) => (
    reply.redirect(webTls.info.uri + request.url.path).permanent()));
  return next();
};

exports.register.attributes = {
  name: 'Tls',
};
