const Koa = require("koa");
const http = require("http");
const websockify = require("koa-websocket");
const websocketMiddleware = require("./utils/websocketMiddleware"); // 引入自定义 WebSocket 中间件

const app = new Koa();
const server = http.createServer(app.callback());

// 使用 koa-websocket 中间件
const websocketApp = websockify(app);

// 使用自定义 WebSocket 中间件
websocketApp.ws.use(websocketMiddleware());

// HTTP 路由处理（可选）
websocketApp.use(async (ctx) => {
  ctx.body = "Hello, ws!";
});
let port = 19001;
server.listen(port, () => {
  console.log("websoket服务启动");
});
