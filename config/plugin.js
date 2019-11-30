'use strict'

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.redis = {
  enable: true,
  package: 'egg-redis'
}

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.sessionRedis = {
    enable: true,
    package: 'egg-session-redis',
};
