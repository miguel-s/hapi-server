'use strict';

module.exports = function handler(request, reply) {
  request.cookieAuthAdmin.clear();
  return reply.redirect('/');
};
