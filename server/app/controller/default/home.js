const Controller = require('egg').Controller;

class HomeController extends Controller {
  /**
   * 首页文章列表
   * /default/getActicleList
   */
  async getArticleList() {
    const { ctx, app } = this;
    let sql = `
            select art.id as id,
                        art.title as title,
                        art.introduce as introduce,
                        FROM_UNIXTIME(art.addTime,'%Y-%m-%d') as addTime,
                        art.introduce_html as introduce_html
                        from article art;`;
    const res = await app.mysql.query(sql);
    ctx.returnBody(res);
  }

  /**
   * 得到详细页文章接口
   */
  async getArticleById() {
    const { ctx, app } = this;
    //先配置路由的动态传值，然后再接收值
    let id = ctx.params.id;
    let sql2 = `
        SELECT Id,title,article_content, 
        introduce,article_content_html ,introduce_html FROM article WHERE id= ${id}
      `;
    let result2 = await app.mysql.query(sql2);
    ctx.returnBody(result2);
  }

  /**
   * 得到类别名称和编号
   */
  async getTypeInfo() {
    const { ctx, app } = this;
    const result = await app.mysql.select('type');
    ctx.returnBody(result);
  }

  /**
   * 根据类比ID获得同一类别的文章列表
   */
  async getTypeListById() {
    const { ctx, app } = this;
    let id = parseInt(ctx.params.id);
    if (id) {
      let sql = `
        SELECT article.id as id, 
        article.title as title, 
        article.introduce as introduce, 
        article.view_count as view_count ,
        type.typeName as typeName  
        FROM article LEFT JOIN type ON article.type_id = type.Id  
        WHERE type_id = ${id};
      `;
      const result = await app.mysql.query(sql);
      ctx.returnBody(result);
    } else {
      this.ctx.body = { data: '错误的Id' };
    }
  }

  /**
   * 获得总集数和总浏览数
   */
  async getAllPartCount() {
    const { ctx, app } = this;
    let sql = `
      SELECT SUM(part_count) as all_part_count ,
      SUM(view_count) as all_view_count
      FROM article
    `;
    const result = await app.mysql.query(sql);
    ctx.returnBody(result);
  }
}

module.exports = HomeController;
