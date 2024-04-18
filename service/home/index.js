/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-21 14:40:17
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-10-09 14:20:59
 */
const pool = require("../../sql");

//监控新增
async function getMonitorAddition({
  monitorId,
  monitor,
  runTime,
  monitorCategoryName,
  monitorCategoryVal,
}) {
  const promisePool = pool.promise(); // 创建一个使用 Promises 的数据库连接池
  try {
    const query =
      "INSERT INTO iot_big_screen_monitor_category (monitorId,monitor,runTime,monitorCategoryName,monitorCategoryVal) VALUES (?,?,?,?,?)";
    const values = [
      monitorId,
      monitor,
      runTime,
      monitorCategoryName,
      monitorCategoryVal,
    ];
    const [result] = await promisePool.query(query, values);
    return result; // 返回插入结果
  } catch (err) {
    console.error("Error inserting into database:", err);
    throw err; // 抛出错误以供上层处理
  }
}
//监控删除
async function getMonitorDelete(monitorIdList) {
  const promisePool = pool.promise(); // 创建一个使用 Promises 的数据库连接池
  try {
    const query =
      "DELETE FROM iot_big_screen_monitor_category WHERE monitorId IN (?)";
    const values = [monitorIdList];
    const [result] = await promisePool.query(query, values);
    return result; // 返回插入结果
  } catch (err) {
    console.error("Error querying database:", err);
    throw err; // 抛出错误以供上层处理
  }
}
//监控查询下拉框
async function getMonitorQueryOption() {
  const promisePool = pool.promise(); // 创建一个使用 Promises 的数据库连接池
  try {
    const query = "SELECT monitor FROM `iot_big_screen_monitor_category`";
    const [result] = await promisePool.query(query);
    if (result.length === 0) {
      result = [];
    }
    let res = [];
    result.forEach((item) => {
      if (!res.includes(item.monitor)) {
        res.push(item.monitor);
      }
    });
    return res; // 返回插入结果
  } catch (err) {
    console.error("Error querying database:", err);
    throw err; // 抛出错误以供上层处理
  }
}

//监控分页查询
async function getMonitorQuery(monitor, pageNo, pageSize, type) {
  const promisePool = pool.promise(); // 创建一个使用 Promises 的数据库连接池
  if (type == "list") {
    try {
      let countQuery =
        "SELECT COUNT(*) as total FROM iot_big_screen_monitor_category";
      let query = "SELECT * FROM iot_big_screen_monitor_category";
      let values = [];
      if (monitor) {
        countQuery += " WHERE monitor=?";
        query += " WHERE monitor=?";
        values.push(monitor);
      }
      const [countResult] = await promisePool.query(countQuery, values);
      const total = countResult[0].total;
      query += " LIMIT ? OFFSET ?";
      values.push(pageSize, (pageNo - 1) * pageSize);
      const [result] = await promisePool.query(query, values);
      return { total, result }; // 返回总数和分页查询结果
    } catch (err) {
      // console.error("Error querying database:", err);
      throw err; // 抛出错误以供上层处理
    }
  } else {
    let result = [];
    if (monitor && monitor != "") {
      let query =
        "SELECT * FROM iot_big_screen_monitor_category WHERE monitor=? ";
      [result] = await promisePool.query(query, [monitor]);
    } else {
      let query = "SELECT * FROM iot_big_screen_monitor_category";
      [result] = await promisePool.query(query);
    }
    if (result.length == 0) {
      return [];
    }
    return result;
  }
}

//监控修改
async function getMonitorEdit({
  monitorId,
  runTime,
  monitorCategoryName,
  monitorCategoryVal,
}) {
  const promisePool = pool.promise(); // 创建一个使用 Promises 的数据库连接池
  try {
    const query =
      "UPDATE iot_big_screen_monitor_category SET runTime = ?,monitorCategoryName=?,monitorCategoryVal=? WHERE monitorId= ?";
    const values = [
      runTime,
      monitorCategoryName,
      monitorCategoryVal,
      monitorId,
    ];
    const [result] = await promisePool.query(query, values);
    return result; // 返回插入结果
  } catch (err) {
    console.error("Error inserting into database:", err);
    throw err; // 抛出错误以供上层处理
  }
}

module.exports = {
  getMonitorAddition,
  getMonitorQuery,
  getMonitorEdit,
  getMonitorDelete,
  getMonitorQueryOption
}
