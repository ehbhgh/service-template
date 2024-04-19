const jwt = require("jsonwebtoken");
const koaJwt = require("koa-jwt");

function jwtMiddlewares(secretKey) {
  // 封装生成 JWT 的函数
  function generateJWT(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // 过期时间为 1 小时
  }
  // Koa 中间件函数
  function jwtMiddleware() {
    return koaJwt({ secret: secretKey }).unless({
      path: [/^\/login/,/^\/login\/regist/], // 除了登录路由外的其他路由都需要验证 JWT
    });
  }
  // 创建 Redis 客户端实例
  return async  (ctx, next) =>{
    // 将 Redis 客户端添加到 Koa 的 context 对象中
    ctx.jwtMiddleware = jwtMiddleware;
    ctx.generateJWT = generateJWT;
    // 执行下一个中间件
    await next();
  };
}
module.exports = jwtMiddlewares;
