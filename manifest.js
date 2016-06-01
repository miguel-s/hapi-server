'use strict';

module.exports = {
  connections: [
    {
      port: Number(process.env.PORT) || 8000,
      labels: ['heroku'],
    },
  ],
  registrations: [
    // Basic plugins
    {
      plugin: 'inert',
      options: {
        select: ['heroku'],
      },
    },
    {
      plugin: 'vision',
      options: {
        select: ['heroku'],
      },
    },
    {
      plugin: 'hapi-auth-cookie',
      options: {
        select: ['heroku'],
      },
    },
    {
      plugin: 'hapi-auth-jwt2',
      options: {
        select: ['heroku'],
      },
    },

    // Global plugins
    {
      plugin: './good',
      options: {
        select: ['heroku'],
      },
    },
    {
      plugin: './database',
      options: {
        select: ['heroku'],
      },
    },
    {
      plugin: './tls',
      options: {
        select: ['heroku'],
      },
    },
    // {
    //   plugin: './lout',
    //   options: {
    //     select: ['server'],
    //   },
    // },

    // Modules
    {
      plugin: './server/index',
      options: {
        select: ['heroku'],
      },
    },
    {
      plugin: './wantit/index',
      options: {
        select: ['heroku'],
        routes: { prefix: '/wantit' },
      },
    },
  ],
};
