'use strict';

module.exports = function handler(request, reply) {
  const prefix = request.route.realm.modifiers.route.prefix;
  const user = {};

  if (request.auth.isAuthenticated) {
    user.id = request.auth.credentials.id;
    user.username = request.auth.credentials.username;
    user.email = request.auth.credentials.email;
    user.token = request.auth.credentials.token;
    return reply.view('profile', { user, prefix });
  }
  return reply.redirect(`${prefix}/login`);
};
