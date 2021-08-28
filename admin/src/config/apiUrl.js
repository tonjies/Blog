
let ipUrl='http://127.0.0.1:7001/admin/'
let servicePath={
    checkLogin:ipUrl+'checkLogin',//检查用户名和密码是否正确
    getTypeInfo:ipUrl+'getTypeInfo',//检查文章类型
    getArticleList:ipUrl+'getArticleList',//获取文章列表
    delArticle:ipUrl+'delArticle/',//删除文章
    updateIsTop:ipUrl+'updateTop',//修改文章是否置顶
    addArticle:ipUrl+'addArticle',//添加文章
    updateArticle:ipUrl+'updateArticle',//添加文章
    getArticleById:ipUrl+'getArticleById/',//根据ID获得文章详情
}
export default servicePath
