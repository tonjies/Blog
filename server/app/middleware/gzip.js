const {codes} = require("../public/exception-config");
module.exports = options=>{
  return async function gzip(ctx, next) {
    console.log('中间件被调用')
    let token=ctx.get('token')
    console.log(token)
    if(!token){
      console.log("ss:"+codes[10001])
      ctx.returnBody({},false,codes[10001],10001)
      return
    }
    let user;
    try {
      user = await ctx.checkToken(token);
    } catch (e) {
      console.log("error1")
      ctx.returnBody({},false,codes[10001],10001)
    }
    if(!user){
      console.log("error2")
      ctx.returnBody({},false,codes[10001],10001)
      return
    }
    ctx.request.user = user;
    await next();
  }
}
