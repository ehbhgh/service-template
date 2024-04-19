/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2024-02-26 15:31:57
 * @LastEditors: Wang Su
 * @LastEditTime: 2024-02-26 16:59:42
 */

const { router, routerApi } = require("../index.js");
const {loginController,registController}=require("../../controller/login")
router.post(routerApi.LOGIN + "/getPublicKey", async (ctx) => {
  let params = ctx.request.body;
  try {
    const data = await ctx.sendRequestToNodeService(
      "/v2/iot/getPublicKey",
      "POST",
      params
    );
    ctx.body = {
      ...data,
    };
  } catch (err) {
    ctx.body = err.response.data;
  }
});
router.post(routerApi.LOGIN,loginController);
router.post(routerApi.LOGIN+ "/regist",registController);
module.exports = router;
