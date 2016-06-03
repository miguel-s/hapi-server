'use strict';

const dotenv = require('dotenv').config();
const Hoek = require('hoek');
const Server = require('./server.js');

const internals = {};
internals.manifest = require('./manifest');
internals.composeOptions = { relativeTo: `${__dirname}/plugins` };
internals.settings = require('./settings.js');

Server.init(internals.manifest, internals.composeOptions, (err, server) => {
  Hoek.assert(!err, err);

  server.app.settings = internals.settings;

  const admin = server.select('admin');
  const wantit = server.select('wantit');
  const ibc = server.select('ibc');

  console.log(`Admin connection started at: ${admin.info.uri}`);
  console.log(`Wantit connection started at: ${wantit.info.uri}`);
  console.log(`Ibc connection started at: ${ibc.info.uri}`);
});
