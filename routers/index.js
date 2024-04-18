const Router = require('koa-router');
const router = new Router();
const routerApi={
  MONITORAPI:"/monitor/",
  LOGIN:"/login"
}
module.exports= {
    router,
    routerApi
}