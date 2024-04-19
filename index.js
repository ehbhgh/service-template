/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-16 23:31:37
 * @LastEditors: Wang Su
 * @LastEditTime: 2024-02-19 15:02:09
 */
const Koa = require("koa");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const jsonerror = require("koa-json-error");
const parameter = require("koa-parameter");
const homeRouter = require("./routers/home/index.js");
const loginRouter = require("./routers/login/index.js");
// const redisMiddleware = require("./middlewares/redisMiddlewares.js");
const jwtMiddlewares = require('./middlewares/jwtMiddlewares');
const request = require("./middlewares/request.js");
const app = new Koa();
//处理跨域问题中间件
app.use(cors());
//处理错误中间件
app.use(jsonerror());
//处理post参数解析中间件
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(parameter(app));
// 使用日志中间件
app.use(logger());
//使用JWT中间件
app.use(jwtMiddlewares("iloveqy"));
// 引入redis中间件,缓存数据
// app.use(
//   redisMiddleware({
//     port: 6379,
//     host: "127.0.0.1",
//   })
// );
// 封装一个中间件处理发送请求到Java服务
app.use(request);
//路由中间件
app.use(homeRouter.routes()).use(homeRouter.allowedMethods());
app.use(loginRouter.routes()).use(loginRouter.allowedMethods());

const port = 19312;
app.listen(port, () => {
  console.log(`19312端口服务启用`);
});
