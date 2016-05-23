'use strict';

const config = require('./config/config.js');

module.exports = {
  connections: [
    {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 8000,
      labels: ['web'],
    },
    // {
    //   host: process.env.HOST || 'localhost',
    //   port: process.env.PORT || 8001,
    //   labels: ['web-tls'],
    //   tls: config.tls,
    // },
  ],
  registrations: [
    {
      plugin: 'inert',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: 'vision',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: 'hapi-auth-cookie',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/good',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/jade',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/database',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/auth-cookie',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/static',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/index',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/errors',
      options: {
        select: ['web'],
      },
    },
    // {
    //   plugin: './plugins/tls',
    //   options: {
    //     select: ['web'],
    //   },
    // },
    {
      plugin: './plugins/lout',
      options: {
        select: ['web'],
      },
    },
  ],
};
