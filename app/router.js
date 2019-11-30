'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user/sign', controller.user.sign);

  router.get('/user', controller.user.findAllUser);

  router.post('/login', controller.user.loginWithUnPa);

  router.get('/test', controller.user.test);
}
