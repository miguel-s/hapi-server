'use strict';

// const config = require('./config/config.js');

module.exports = {
  connections: [
    {
      port: Number(process.env.PORT) || 8000,
      labels: ['web'],
    },
    // {
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
      plugin: './plugins/auth-cookie',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: 'hapi-auth-jwt2',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/auth-jwt',
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
      plugin: './plugins/wantit_static',
      options: {
        select: ['web'],
        routes: { prefix: '/wantit' },
      },
    },
    {
      plugin: './plugins/wantit_web',
      options: {
        select: ['web'],
        routes: { prefix: '/wantit' },
      },
    },
    {
      plugin: './plugins/wantit_api',
      options: {
        select: ['web'],
        routes: { prefix: '/wantit/api' },
      },
    },
    {
      plugin: './plugins/errors',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/tls',
      options: {
        select: ['web'],
      },
    },
    {
      plugin: './plugins/lout',
      options: {
        select: ['web'],
      },
    },
  ],
};
