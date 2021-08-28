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
