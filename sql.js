/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-16 23:31:50
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-10-07 08:59:57
 */
const mysql = require("mysql2");
const config=require("./config.json")
const pool = mysql.createPool(config.sqlConfig);
module.exports = pool;

