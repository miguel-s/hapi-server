'use strict';

module.exports = function handler(request, reply) {
  const prefix = request.route.realm.modifiers.route.prefix;
  request.cookieAuthIbc.clear();
  return reply.redirect(prefix);
};
