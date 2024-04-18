/*
 * @Description:
 * @Author: Wang Su
 * @Date: 2023-09-18 17:11:47
 * @LastEditors: Wang Su
 * @LastEditTime: 2023-10-12 11:26:54
 */
const { convertDayFormat } = require("./timeUtils");
const deviceAddtionChart = (data) => {
  let obj = {
    xList: [],
    barChartList: [],
    lineChartList: [],
    lengendList: ["边缘设备","端设备"],
  };
  data.forEach((item) => {
    obj.lineChartList.push(item.edgeDevice);
    obj.barChartList.push(item.endDevice);
    obj.xList.push(convertDayFormat(item.runTime));
   
  });
  return obj;
};
const appNumStaxtics = (data) => {
  return data;
};

const monitorLineCharts =(inputData) =>{
  const categories = [...new Set(inputData.map(item => item.monitorCategoryName))];
  const runTimes = [...new Set(inputData.map(item => item.runTime))];
  const result = {
    legendList: categories,
    xList: runTimes,
    seriesList: categories.map(category => {
      return {
        name: category,
        type: 'line',
        data: runTimes.map(time => {
          const matchingItem = inputData.find(item => item.monitorCategoryName === category && item.runTime === time);
          return matchingItem ? parseFloat(matchingItem.monitorCategoryVal) : 0;
        }),
      };
    }),
  };

  return result;
}


const monitorAlarmCharts =(inputData) =>{
  const categories = [...new Set(inputData.map(item => item.aramCategory))];
  const runTimes = [...new Set(inputData.map(item => item.aramTime))];
  const result = {
    legendList: categories,
    xList: runTimes,
    seriesList: categories.map(category => {
      return {
        name: category,
        type: 'line',
        data: runTimes.map(time => {
          const matchingItem = inputData.find(item => item.aramCategory == category && item.aramTime === time);
          return matchingItem ? parseFloat(matchingItem.aramCategoryVal) : 0;
        }),
      };
    }),
  };

  return result;
}

const  createTree=(data)=> {
  const nodeDict = {}; // 用于存储节点的字典
  const rootNodes = []; // 存储根节点的数组

  data.forEach(item => {
      // 创建当前节点
      const currentNode = { ...item, children: [] };
      // 将当前节点存储在字典中
      nodeDict[currentNode.regionId] = currentNode;
      const pid = item.pid;
      if (!nodeDict[pid]) {
          // 没有父节点，将当前节点视为根节点
          rootNodes.push(currentNode);
      } else {
          // 有父节点，将当前节点添加到父节点的 children 中
          nodeDict[pid].children.push(currentNode);
      }
  });

  return rootNodes;
}

module.exports = {
  deviceAddtionChart,
  appNumStaxtics,
  monitorLineCharts,
  monitorAlarmCharts,
  createTree
};
