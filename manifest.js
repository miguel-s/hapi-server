'use strict';

module.exports = {
  connections: [
    {
      port: process.env.ADMIN_PORT,
      labels: ['admin'],
    },
    {
      port: process.env.GEOLINK_PORT,
      labels: ['geolink'],
    },
    {
      port: process.env.SPURCORR_PORT,
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
        select: ['admin', 'geolink'],
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
