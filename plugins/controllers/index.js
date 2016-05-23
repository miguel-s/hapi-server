'use strict';

module.exports = function handler(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.view('index');
  }
  return reply.redirect('/login');
};
