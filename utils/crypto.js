const crypto = require("crypto");

const iv = crypto.randomBytes(16); // 生成一个 16 字节的随机初始化向量
// 生成一个长度为 64 字节的随机密钥
const generateRandomKey = () => {
  return crypto.randomBytes(64).toString("hex");
};
const secretKey = "iloveqy";
// 加密函数
// 加密密码函数
function encryptPassword(password) {
  // 生成随机的盐值
  const salt = crypto.randomBytes(16).toString("hex");
  console.log(salt,password,'注册密码');
  // 使用盐值和密码生成哈希值
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return { salt, hashedPassword };
}

// 对比密码是否正确函数
function comparePassword(users, user_account, hashedPassword) {
  // 在真实场景中，这里应该查询数据库验证用户名和密码的正确性
  const user = users.find((user) => user.user_account === user_account);
  if (!user) {
    return false;
  }

  // 使用存储的盐值和输入的密码生成哈希值
  const { salt_hash, pass_word } = user;
  const inputHashedPassword = crypto
    .pbkdf2Sync(hashedPassword, salt_hash, 10000, 64, "sha512")
    .toString("hex");
  return pass_word === inputHashedPassword;
}
module.exports = {
  generateRandomKey,
  encryptPassword,
  comparePassword,
};
