'use strict';

module.exports = function handler(request, reply) {
  request.cookieAuthServer.clear();
  return reply.redirect('/');
};
