
module.exports=app=>{
  const {router,controller}=app

  //1,获取文章列表
  router.get('/default/getArticleList',controller.default.home.getArticleList)
  //2,获取文章详情
  router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
  //3,获取类别名称和编号
  router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
  //4,根据类别ID获得文章列表
  router.get('/default/getListById/:id',controller.default.home.getTypeListById)
  //5,获得所有集数和访问数
  router.get('/default/getAllPartCount',controller.default.home.getAllPartCount)
}
