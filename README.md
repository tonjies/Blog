### React+Egg.js实现全栈个人博客

> 这是一个个人博客软件，前台和后台使用的都是React，后端使用egg.js，[地址](https://github.com/tonjies/Blog)

#### 前台

文章列表

![1.png](https://upload-images.jianshu.io/upload_images/4002920-3b79b54f96d20887.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


文章详情

![2.png](https://upload-images.jianshu.io/upload_images/4002920-ebf696c84b62283b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 后台管理系统

添加文章

![3.png](https://upload-images.jianshu.io/upload_images/4002920-20ff374b4716f364.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


文章列表

![4.png](https://upload-images.jianshu.io/upload_images/4002920-50602d113341a254.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




#### 文件夹简介及注意事项

- admin 后台管理系统
- blog  前台博客页面
- resource 图片和其他资源
- server 后端

注意事项：

- 项目应该提前创建好数据库名(使用如dataGrip)，并在server和AdminService下各自的config/config.default.js中配置自己的信息（根据自己创建数据库时的地址和用户名）

```js
// config/config.${env}.js
exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: 'blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};
exports.keys = 'my-cookie-secret-key';
exports.security={
    csrf: {
        enable: false,
    },
    domainWhiteList: ['*'], //允许访问域名的白名单,*表示都能访问
}
exports.cors={
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', //允许请求的方法
}
exports.jwt={
    secret: '123456', // token的加密的密钥,自己随便设置
}

```

- 创建好数据库后，resource文件夹下有一个init.sql初始文件，可以使用datagrip导入相关的表结构和默认表数据（admin表有一个默认账号，tonjies，123，以及三篇默认文章）



































