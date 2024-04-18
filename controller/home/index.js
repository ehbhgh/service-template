/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-21 14:40:17
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-10-09 14:20:59
 */
const { monitorLineCharts } = require("../../utils/processChartsData.js");
const { generateUUID } = require("../../utils/uuid.js");
const {
  getMonitorAddition,
  getMonitorQuery,
  getMonitorQueryOption,
  getMonitorEdit,
  getMonitorDelete,
} = require("../../service/home/index.js");

//监控新增
const monitorAddController = async (ctx) => {
  try {
    let res = ctx.request.body;
    res.monitorId = generateUUID();
    const app = await getMonitorAddition(res);
    if (!app) {
      ctx.throw(404, "No devices found");
    }
    ctx.body = {
      code: 200,
      msg: "新增成功",
    };
  } catch (err) {
    console.log(err);
    ctx.throw(500, err);
  }
};

//监控删除
const monitorDeleteController = async (ctx) => {
  const { monitorIdList } = ctx.request.body;
  try {
    const app = await getMonitorDelete(monitorIdList);
    if (!app) {
      ctx.throw(404, "No devices found");
    }
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  } catch (err) {
    console.log(err);
    ctx.throw(500, err);
  }
};

//监控查询下拉框
const monitorQueryOptionController = async (ctx) => {
  try {
    const app = await getMonitorQueryOption();
    if (!app) {
      ctx.throw(404, "No devices found");
    }
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: app,
    };
  } catch (err) {
    console.log(err);
    ctx.throw(500, err);
  }
};

//监控分页查询
const monitorQueryController = async (ctx) => {
  ctx.verifyParams({
    type: { type: "string", required: true },
    pageNo: { type: "number", required: true },
    pageSize: { type: "number", required: true },
  });
  const { monitor, type, pageNo, pageSize } = ctx.request.body;
  try {
    if (type && type == "list") {
      const app = await getMonitorQuery(monitor, pageNo, pageSize, type);
      if (!app) {
        ctx.throw(404, "No devices found");
      }
      ctx.body = {
        code: 200,
        msg: "success",
        data: app,
      };
    } else {
      const app = await getMonitorQuery(monitor, 1, 9999);
      if (!app) {
        ctx.throw(404, "No devices found");
      }
      ctx.body = {
        code: 200,
        msg: "查询成功",
        data: monitorLineCharts(app),
      };
    }
  } catch (err) {
    ctx.throw(500, err);
  }
};

//监控修改
const monitorEditController = async (ctx) => {
  try {
    let res = ctx.request.body;
    const app = await getMonitorEdit(res);
    if (!app) {
      ctx.throw(404, "No devices found");
    }
    ctx.body = {
      code: 200,
      msg: "修改成功",
    };
  } catch (err) {
    console.log(err);
    ctx.throw(500, err);
  }
};
module.exports = {
  monitorAddController,
  monitorDeleteController,
  monitorQueryOptionController,
  monitorQueryController,
  monitorEditController,
};
