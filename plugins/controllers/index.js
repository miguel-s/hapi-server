'use strict';

module.exports = function handler(request, reply) {
  const userData = {};
  // Already logged in?
  if (request.auth.isAuthenticated) {
    // User logged in show user links.
    userData.username = request.auth.credentials.username;
    userData.email = request.auth.credentials.email;
    return reply.redirect('/dashboard');
  }
  return reply.view('index');
};
