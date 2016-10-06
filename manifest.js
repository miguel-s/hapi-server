'use strict';

module.exports = {
  connections: [
    {
      port: process.env.ADMIN_PORT,
      labels: ['admin'],
      router: {
        stripTrailingSlash: true,
      },
    },
    {
      port: process.env.GEOLINK_PORT,
      labels: ['geolink'],
      router: {
        stripTrailingSlash: true,
      },
    },
    {
      port: process.env.SPURCORR_PORT,
      labels: ['spurcorr'],
      router: {
        stripTrailingSlash: true,
      },
    },
    {
      port: process.env.DASHBOARDS_PORT,
      labels: ['dashboards'],
      router: {
        stripTrailingSlash: true,
      },
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
