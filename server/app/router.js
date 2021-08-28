'use strict';

/**
 *
 */
module.exports = app => {
  const { router, controller } = app;
  require('./router/default')(app)
  require('./router/admin')(app)
};
