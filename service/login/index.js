const pool = require("../../sql");

//监控新增
async function registAddition({
  user_id,
  update_time,
  pass_word,
  user_name,
  user_account,
  create_time,
  salt_hash,
}) {
  const promisePool = pool.promise(); // 创建一个使用 Promises 的数据库连接池
  try {
    const queryUserAccount = "SELECT * FROM `iot_user` where user_account=?";
    const [accountRes] = await promisePool.query(queryUserAccount, [
      user_account,
    ]);
    if (accountRes.length > 0) {
      return;
    } else {
      const query =
        "INSERT INTO iot_user (user_id,update_time,pass_word,user_name,user_account,create_time,salt_hash) VALUES (?,?,?,?,?,?,?)";
      const values = [
        user_id,
        update_time,
        pass_word,
        user_name,
        user_account,
        create_time,
        salt_hash,
      ];
      const [result] = await promisePool.query(query, values);
      return result; // 返回插入结果
    }
  } catch (err) {
    console.error("Error inserting into database:", err);
    throw err; // 抛出错误以供上层处理
  }
}

async function loginAddition() {
  const promisePool = pool.promise(); // 创建一个使用 Promises 的数据库连接池
  const query = "SELECT * FROM `iot_user`";
  const [result] = await promisePool.query(query);
  return result; // 返回总数和分页查询结果
}
module.exports = {
  registAddition,
  loginAddition,
};
