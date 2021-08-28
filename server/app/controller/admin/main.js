const Controller = require('egg').Controller;
const { codes } = require('../../public/exception-config');

/**
 * 后台管理相关的接口
 */
class MainController extends Controller {

  //判断用户名和密码是否正确
  async checkLogin() {
    const { ctx, app } = this;
    let userName = ctx.request.body.username;
    let password = ctx.request.body.password;
    if (userName == null || password == null) {
      ctx.returnBody(false, {}, codes[10001], 10001);
    }
    const sql = `SELECT userName FROM admin WHERE username = "${userName}" AND password = "${password}" `;
    const res = await app.mysql.query(sql);
    if (res.length > 0) {
      const user = { userName: userName, password: password, userId: res[0].id };
      let token = await ctx.getToken(user);
      ctx.returnBody({ 'token': token });
    } else {
      ctx.returnBody({}, false, codes[10003], 10003);
    }
  }


  //添加文章
  async addArticle() {
    const { ctx, app } = this;
    let tmpArticle = ctx.request.body;
    const result = await app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    /**
     * 在这里先返回一个最终插入数据库后列的主键id，当文章需要修改的时候
     * 前端会发送这个id到后台接口，进行相应的修改操作
     */
    const insertId = result.insertId;
    ctx.returnBody({ isSuccess: insertSuccess, insertId: insertId });
  }

  //修改文章
  async updateArticle() {
    const { ctx, app } = this;
    let tmpActicle = ctx.request.body;
    const result = await app.mysql.update('article', tmpActicle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.returnBody({ isSuccess: updateSuccess });
  }

  //获取文章列表
  async getArticleList() {
    const { ctx, app } = this;
    let sql = `
      SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      from_unixtime(article.addTime,'%Y-%m-%d') as addTime,
      article.isTop as isTop
      FROM article
    `;
    const resList = await app.mysql.query(sql);
    ctx.returnBody(resList);
  }

  //删除文章
  async delArticle() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    const res = await app.mysql.delete('article', { 'id': id });
    ctx.returnBody(res);
  }

  //根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let sql = `
      SELECT id as id,
      title as title,
      introduce as introduce,
      article_content as article_content
      from article
      WHERE article.id=${id};
    `;
    const result = await app.mysql.query(sql);
    ctx.returnBody(result);
  }


  //修改文章置顶信息
  async updateIsTop() {
    const { ctx, app } = this;
    let tmpArticle = ctx.request.body;
    let sql = `update article set isTop = ${tmpArticle.isTop} where id = ${tmpArticle.id}`;
    let updateResult = await app.mysql.query(sql);
    let updateSuccess = updateResult.affectedRows === 1;
    if (updateSuccess) {
      ctx.returnBody({});
    } else {
      ctx.body = { data: 'error' };
    }
  }
}

module.exports = MainController;
