//时间戳 转成2023-9-18 09:12:09形式
function convertTimeFormat(originalTime) {
  const date = new Date(originalTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const convertedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return convertedTime;
}

//时间戳 转成2023-9-18形式
function convertDayFormat(originalTime) {
  const date = new Date(originalTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const convertedTime = `${year}-${month}-${day}`;
  return convertedTime;
}

//获取当前时间
function getCurrentDateTime() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  // 格式化月份和日期，确保为两位数
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  // 格式化小时、分钟和秒，确保为两位数
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var formattedDateTime =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return formattedDateTime;
}

//获取时间到天
function getCurrentDate() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();

  // 格式化月份和日期，确保为两位数
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  var formattedDateTime = year + "-" + month + "-" + day;
  return formattedDateTime;
}

//2023-09-25T06:18:31.000Z转成正常时间
function formatTime(dateString) {
  // 将时间字符串转换为Date对象
  var date = new Date(dateString);

  // 提取时分秒
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds();

  // 格式化时分秒
  var formattedTime =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return formattedTime;
}

function tfTimestamp(dates) {
  // 将时间字符串转换为时间戳
  var date = new Date(dates);
  var timestamp = date.getTime();
  if(typeof timestamp == "number"){
    timestamp=Number(timestamp.toString().slice(0, -3))
 }
  return timestamp;
}

// 获取当前日期时间前24小时
function getYesterdayDateTimeCN(val) {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const year = yesterday.getFullYear();
  const month = ("0" + (yesterday.getMonth() + 1)).slice(-2); // 月份是从0开始的
  const day = ("0" + yesterday.getDate()).slice(-2);
  const hours = ("0" + yesterday.getHours()).slice(-2);
  const minutes = ("0" + yesterday.getMinutes()).slice(-2);
  const seconds = ("0" + yesterday.getSeconds()).slice(-2);

  if (val == "CN") {
    const beforeDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; //1. 前24小时转为中国标准时间格式
    const beforeTimestamp24 = new Date(beforeDateTime).getTime(); //转为时间戳
    const cn = new Date(beforeTimestamp24);
    return cn;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; //2.获取当前日期时间前24小时 年月日时分秒
  }
}

module.exports = {
  convertTimeFormat,
  getCurrentDateTime,
  convertDayFormat,
  getCurrentDate,
  formatTime,
  tfTimestamp,
  getYesterdayDateTimeCN,
};
