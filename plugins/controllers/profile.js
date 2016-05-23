'use strict';

module.exports = function handler(request, reply) {
  const user = {};
  // Already logged in?
  if (request.auth.isAuthenticated) {
    user.id = request.auth.credentials.id;
    user.username = request.auth.credentials.username;
    user.email = request.auth.credentials.email;
    return reply.view('profile', { user });
  }
  return reply.redirect('/login');
};
