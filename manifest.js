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
    {
      port: process.env.PORT_SPURCORR,
      labels: ['spurcorr'],
    },
  ],
  registrations: [
    // Basic plugins
    {
      plugin: 'inert',
      options: {
        select: ['admin', 'geolink', 'spurcorr'],
      },
    },
    {
      plugin: 'vision',
      options: {
        select: ['admin', 'geolink', 'spurcorr'],
      },
    },
    {
      plugin: 'hapi-auth-cookie',
      options: {
        select: ['admin', 'geolink', 'spurcorr'],
      },
    },
    {
      plugin: 'hapi-auth-jwt2',
      options: {
        select: ['admin', 'geolink', 'spurcorr'],
      },
    },

    // Global plugins
    {
      plugin: './good',
      options: {
        select: ['admin', 'geolink', 'spurcorr'],
      },
    },
    {
      plugin: './database',
      options: {
        select: ['admin', 'geolink', 'spurcorr'],
      },
    },
    // {
    //   plugin: './tls',
    //   options: {
    //     select: ['admin', 'geolink', 'spurcorr'],
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
    {
      plugin: '../../hapi-spurcorr/index',
      options: {
        select: ['spurcorr'],
      },
    },
  ],
};
