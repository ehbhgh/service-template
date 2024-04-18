/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-21 14:40:25
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-10-08 17:01:03
 */
const { router, routerApi } = require("../index.js");
const {
  monitorAddController,
  monitorDeleteController,
  monitorQueryOptionController,
  monitorQueryController,
  monitorEditController,
} = require("../../controller/home/index.js");

//监控新增
router.post(routerApi.MONITORAPI + "addition",monitorAddController);

//监控删除
router.delete(routerApi.MONITORAPI + "delete",monitorDeleteController);

//监控查询下拉框
router.post(routerApi.MONITORAPI + "select",monitorQueryOptionController);

//监控分页查询
router.post(routerApi.MONITORAPI + "query",monitorQueryController);

//监控修改
router.put(routerApi.MONITORAPI + "edit",monitorEditController);

module.exports = router;
