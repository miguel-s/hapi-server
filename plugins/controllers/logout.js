'use strict';

module.exports = function handler(request, reply) {
  const prefix = request.route.realm.modifiers.route.prefix;
  request.cookieAuth.clear();
  return reply.redirect(prefix);
};
