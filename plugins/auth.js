'use strict';

const users = {
  foo: {
    id: 1,
    username: 'Foo Foo',
    password: 'foo',
    email: 'foo@hapiu.com',
    scope: ['admin', 'user'],
  },
  bar: {
    id: 2,
    username: 'Barica',
    password: 'bar',
    email: 'bar@hapiu.com',
    scope: ['user'],
  },
};

const internals = {};

exports.register = (server, options, next) => {
  server.dependency('hapi-auth-basic', internals.after);
  return next();
};

exports.register.attributes = {
  name: 'Auth',
};

internals.validateFunc = (request, username, password, callback) => {
  const user = users[username];
  if (!user || user.password !== password) {
    return callback(null, false);
  }

  user.username = username;
  return callback(null, true, user);
};

internals.after = (server, next) => {
  server.auth.strategy('basic', 'basic', { validateFunc: internals.validateFunc });
  return next();
};
