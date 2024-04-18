/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-25 08:59:05
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-09-25 09:21:35
 */

const cluster = require("cluster");
const os = require("os");
//cpu核心数
const numberCPUs = os.cpus().length;
const process = require("process");
//存储进程对象
var workers = {};

//主进程
if (!cluster.isMaster) {
  //根据cpu核心数开辟进程
  for (var i = 0; i < numberCPUs; i++) {
    //再次复制一次进程，新进程会执行到下面的工作进程
    var worker = cluster.workers();
    console.log('init ...pid',worker.process.pid)
    workers[worker.process.pid]=worker
  }
  cluster.on('exit',(worker,code,signal)=>{
    console.log("工作进程 %d 关闭,重启中。。。,"+worker.process.pid)
    delete workers[worker.process.pid];
        //复制一份再次存进works
    var worker = cluster.fork();
    workers[worker.process.pid]=worker
  })
}
//工作进程
else {
    //开启多个进程,启动服务
    require("./index")
}

//退出程序
process.on("SIGTERM",function(){
    for(var pid in workers){
        process.kill(pid)
    }
    process.exit(0)
})

