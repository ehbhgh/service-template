/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-21 14:40:17
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-10-09 14:20:59
 */
const { getCurrentDateTime } = require("../../utils/timeUtils");
const { generateUUID } = require("../../utils/uuid.js");
const { registAddition, loginAddition } = require("../../service/login");
const { encryptPassword, comparePassword } = require("../../utils/crypto.js");
//登录接口
const loginController = async (ctx) => {
  ctx.verifyParams({
    user_account: { type: "string", required: true },
    pass_word: { type: "string", required: true },
  });
  try {
    let res = ctx.request.body;
    const app = await loginAddition(res);
    if (app) {
      let flag = comparePassword(app, res.user_account, res.pass_word);
      if (flag) {
        const token = ctx.generateJWT({
          ...res,
        });
        ctx.body = {
          code: 200,
          msg: "登录成功",
          token,
        };
      } else {
        ctx.body = {
          code: 403,
          msg: "账号或密码错误",
        };
      }
    } else {
      ctx.body = {
        code: 500,
        msg: "服务内部异常",
      };
    }
  } catch (err) {}
};
//注册接口
const registController = async (ctx) => {
  ctx.verifyParams({
    pass_word: { type: "string", required: true },
    user_name: { type: "string", required: true },
    user_account: { type: "string", required: true },
  });
  let res = ctx.request.body;
  res.create_time = getCurrentDateTime();
  res.update_time = getCurrentDateTime();
  res.user_id = generateUUID();
  let passObj = encryptPassword(res.pass_word);
  res.pass_word = passObj.hashedPassword;
  res.salt_hash = passObj.salt;
  const app = await registAddition(res);
  if (!app) {
    ctx.body = {
      code: 401,
      msg: "用户名重复",
    };
  } else {
    ctx.body = {
      code: 200,
      msg: "注册成功",
    };
  }
  try {
  } catch (err) {}
};

module.exports = {
  loginController,
  registController,
};
