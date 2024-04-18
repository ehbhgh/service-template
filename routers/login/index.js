/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2024-02-26 15:31:57
 * @LastEditors: Wang Su
 * @LastEditTime: 2024-02-26 16:59:42
 */

const { router, routerApi } = require("../index.js");
let jwt = require("jsonwebtoken");
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
router.post(routerApi.LOGIN + "/user", async (ctx) => {
  try {
    let user = {
      username: "ws",
      pwd: "ws030204",
    };
    let token = jwt.sign(
      {
        username: user.username,
      },
      "jiansu-server-jwt",
      {
        expiresIn: 3600 * 24 * 7,
      }
    );
    ctx.body = {
      token,
    };
  } catch (err) {
    // ctx.body = err.response.data;
  }
});

module.exports = router;
