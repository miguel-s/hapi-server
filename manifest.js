'use strict';

module.exports = {
  connections: [
    {
      port: process.env.PORT_ADMIN,
      labels: ['admin'],
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
      plugin: '../../hapi-admin/index',
      options: {
        select: ['admin'],
      },
    },
    {
      plugin: '../../hapi-ibc/index',
      options: {
        select: ['ibc'],
      },
    },
  ],
};
