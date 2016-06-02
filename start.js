'use strict';

const dotenv = require('dotenv').config();
const Hoek = require('hoek');
const Server = require('./server.js');
const settings = require('./settings.js');

const internals = {};
internals.manifest = require('./manifest');
internals.composeOptions = { relativeTo: `${__dirname}/plugins` };

Server.init(internals.manifest, internals.composeOptions, (err, server) => {
  Hoek.assert(!err, err);

  const heroku = server.select('heroku');

  heroku.app.settings = internals.settings = settings;

  console.log(`Server started at: ${heroku.info.uri}`);
});
