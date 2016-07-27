'use strict';

const dotenv = require('dotenv').config();
const pmx = require('pmx').init({ http: true });
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
  const geolink = server.select('geolink');

  console.log(`Admin connection started at: ${admin.info.uri}`);
  console.log(`Geolink connection started at: ${geolink.info.uri}`);
});
