/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-17 00:02:09
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-09-17 00:13:20
 */
const {websocketChat,websocketNotice} = require("./websoketReciveData");
function websocketMiddleware() {
  return async (ctx, next) => {
    if (ctx.path === "/chat") {
      // 处理 /chat WebSocket 连接的逻辑
      websocketChat(ctx);
    } else if (ctx.path === "/notifications") {
      // 处理 /notifications WebSocket 连接的逻辑
      websocketNotice(ctx);
    } else {
      next();
    }
  };
}

module.exports = websocketMiddleware;
