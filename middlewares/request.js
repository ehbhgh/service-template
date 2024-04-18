/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2024-02-19 14:59:32
 * @LastEditors: Wang Su
 * @LastEditTime: 2024-02-26 16:51:18
 */

const axios = require("axios");
// 创建axios实例
const config=require("../config.json")
const instance = axios.create({
  baseURL: config.testUrl
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.authorization) {
      config.headers["Authorization"] = config.authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 封装一个中间件处理发送请求到Java服务
const request = async (ctx, next) => {
  ctx.sendRequestToNodeService = async (url, method, data) => {
        const response = await instance({
        method: method,
        url: url,
        data,
        authorization: ctx.header.authorization, // 从ctx中获取authorization
      });
      return response.data;
    
  };

  await next();
};
//响应拦截器
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
module.exports = request;
