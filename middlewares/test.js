
const crypto = require("crypto");
function encryptPassword(password) {
    // 生成随机的盐值
    const salt = "927005b8be3b63fa8eaa3aea748e0c33";
    // 使用盐值和密码生成哈希值
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    return { salt, hashedPassword };
  }


  console.log(encryptPassword("123456"));