'use strict';

module.exports = {
  connections: [
    {
      port: process.env.PORT_ADMIN,
      labels: ['admin'],
    },
    {
      port: process.env.PORT_GEOLINK,
      labels: ['geolink'],
    },
  ],
  registrations: [
    // Basic plugins
    {
      plugin: 'inert',
      options: {
        select: ['admin', 'geolink'],
      },
    },
    {
      plugin: 'vision',
      options: {
        select: ['admin', 'geolink'],
      },
    },
    {
      plugin: 'hapi-auth-cookie',
      options: {
        select: ['admin', 'geolink'],
      },
    },
    {
      plugin: 'hapi-auth-jwt2',
      options: {
        select: ['admin', 'geolink'],
      },
    },

    // Global plugins
    {
      plugin: './good',
      options: {
        select: ['admin', 'geolink'],
      },
    },
    {
      plugin: './database',
      options: {
        select: ['admin', 'geolink'],
      },
    },
    // {
    //   plugin: './tls',
    //   options: {
    //     select: ['admin', 'geolink'],
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
      plugin: '../../hapi-geolink/index',
      options: {
        select: ['geolink'],
      },
    },
  ],
};
