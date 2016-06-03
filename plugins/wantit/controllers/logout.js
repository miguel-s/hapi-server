'use strict';

module.exports = function handler(request, reply) {
  request.cookieAuthWantit.clear();
  return reply.redirect('/');
};
