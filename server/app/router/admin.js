

module.exports=app=>{
  const {router,controller} =app
  const gzip = app.middleware.gzip({});
  //添加文章
  router.post('/admin/addArticle',controller.admin.main.addArticle)
  //修改文章
  router.post('/admin/updateArticle',controller.admin.main.updateArticle)
  //获取文章列表
  router.post('/admin/getArticleList',controller.admin.main.getArticleList)
  //删除文章
  router.post('/admin/delArticle/:id',controller.admin.main.delArticle)
  //根据文章ID得到文章详情
  router.post('/admin/getArticleById/:id',controller.admin.main.getArticleById)
  //判断用户名密码是否正确
  router.post('/admin/checkLogin',controller.admin.main.checkLogin)
  //修改文章置顶信息
  router.post('/admin/updateTop',controller.admin.main.updateIsTop)

}
