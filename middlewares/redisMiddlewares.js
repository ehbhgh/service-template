const Redis = require('ioredis');

function redisMiddleware(options) {
  // 创建 Redis 客户端实例
  const redis = new Redis(options);

  return async function(ctx, next) {
    // 将 Redis 客户端添加到 Koa 的 context 对象中
    ctx.redis = redis;

    // 执行下一个中间件
    await next();
  };
}

module.exports = redisMiddleware;
