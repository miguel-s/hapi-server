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
    {
      port: process.env.DASHBOARDS_PORT,
      labels: ['dashboards'],
    },
  ],
  registrations: [
    // Basic plugins
    {
      plugin: 'inert',
      options: {
        select: ['admin', 'geolink', 'spurcorr', 'dashboards'],
      },
    },
    {
      plugin: 'vision',
      options: {
        select: ['admin', 'geolink', 'spurcorr', 'dashboards'],
      },
    },
    {
      plugin: 'hapi-auth-cookie',
      options: {
        select: ['admin', 'geolink', 'spurcorr', 'dashboards'],
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
        select: ['admin', 'geolink', 'spurcorr', 'dashboards'],
      },
    },
    {
      plugin: './database',
      options: {
        select: ['admin', 'geolink', 'spurcorr', 'dashboards'],
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
    {
      plugin: '../../hapi-dashboards/index',
      options: {
        select: ['dashboards'],
      },
    },
  ],
};
