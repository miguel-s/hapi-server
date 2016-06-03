'use strict';

module.exports = {
  connections: [
    {
      port: process.env.PORT_ADMIN,
      labels: ['admin'],
    },
    {
      port: process.env.PORT_WANTIT,
      labels: ['wantit'],
    },
    {
      port: process.env.PORT_IBC,
      labels: ['ibc'],
    },
  ],
  registrations: [
    // Basic plugins
    {
      plugin: 'inert',
      options: {
        select: ['admin', 'wantit', 'ibc'],
      },
    },
    {
      plugin: 'vision',
      options: {
        select: ['admin', 'wantit', 'ibc'],
      },
    },
    {
      plugin: 'hapi-auth-cookie',
      options: {
        select: ['admin', 'wantit', 'ibc'],
      },
    },
    {
      plugin: 'hapi-auth-jwt2',
      options: {
        select: ['admin', 'wantit', 'ibc'],
      },
    },

    // Global plugins
    {
      plugin: './good',
      options: {
        select: ['admin', 'wantit', 'ibc'],
      },
    },
    {
      plugin: './database',
      options: {
        select: ['admin', 'wantit', 'ibc'],
      },
    },
    // {
    //   plugin: './tls',
    //   options: {
    //     select: ['admin', 'wantit', 'ibc'],
    //   },
    // },
    // {
    //   plugin: './lout',
    //   options: {
    //     select: ['server'],
    //   },
    // },

    // Modules
    {
      plugin: './admin/index',
      options: {
        select: ['admin'],
      },
    },
    {
      plugin: './wantit/index',
      options: {
        select: ['wantit'],
      },
    },
    {
      plugin: './ibc/index',
      options: {
        select: ['ibc'],
      },
    },
  ],
};
