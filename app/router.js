'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,config,middleware } = app;
  const auth = middleware.verificationToken()
  router.post(`${config.api}`,auth,controller.admin.categories);
  router.get(`${config.api}`,auth, controller.admin.getCategories);
  router.get(`${config.api}/:id`,auth, controller.admin.getCategoriesId);
  router.put(`${config.api}/:id`,auth, controller.admin.putCategories);
  router.delete(`${config.api}/:id`,auth, controller.admin.deleteCategories);

  router.post('/admin/api/upload',auth, controller.upload.index);

  router.post('/admin/api/login', controller.login.login);
};
