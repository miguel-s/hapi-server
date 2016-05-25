'use strict';

const Hoek = require('hoek');
const Server = require('./server.js');
const settings = require('./settings.js');

const internals = {};
internals.manifest = require('./manifest');
internals.composeOptions = { relativeTo: __dirname };

Server.init(internals.manifest, internals.composeOptions, (err, server) => {
  Hoek.assert(!err, err);

  const web = server.select('web');
  // const webTls = server.select('web-tls');

  web.app.settings = internals.settings = settings;

  console.log(`Web server started at: ${web.info.uri}`);
  // console.log(`WebTLS server started at: ${webTls.info.uri}`);
});
