module.exports = {
  apps: [
    {
      name: 'big_screen',         // 应用程序的名称
      script: 'main.js',       // 入口文件的路径
      instances: 1,           // 应用实例数量，通常设置为1
      autorestart: true,      // 遇到错误自动重启
      watch: true,           // 是否监视文件变化，可选
       // 指定日志文件的时间格式
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      max_memory_restart: '1G', // 当内存占用超过1GB时重启，可选
      cron_restart: '0 0 * * *', // 每天0点重启
    },
    // 可以添加更多应用程序的配置
  ],
};
