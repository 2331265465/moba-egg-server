/* eslint valid-jsdoc: "off" */

'use strict';

const path = require("path")
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598862782122_8184';

  // add your middleware config here
  config.middleware = [];

  config.api = '/admin/api/rest/:resource'

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: '121314',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/node-vue-moba',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    },
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  return {
    ...config,
    ...userConfig,
  };
};
