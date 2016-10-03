'use strict';

const fs = require('fs')

const dotenv = require('dotenv').config();
const pmx = require('pmx').init({ http: true });
const Hoek = require('hoek');
const Server = require('./server.js');

const internals = {};
internals.manifest = require('./manifest');
internals.composeOptions = { relativeTo: `${__dirname}/plugins` };

Server.init(internals.manifest, internals.composeOptions, (err, server) => {
  Hoek.assert(!err, err);

  server.app.settings = internals.settings;

  server.connections.forEach((c) => {
    const labels = c.settings.labels.join(', ');
    const port = c.settings.port;
    console.log(`[${labels}] connection started at port [${port}]`);
  });
});
