const playDevIdCharts = (data, type) => {
  // Sort the data by datetime in ascending order
  data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  // Extract datNum and datetime into separate arrays
  const seriesList = data.map((item) => item[type]);
  const xData = data.map((item) => item.datetime);

  // Create an object with xData and seriesList
  const result = { xData, seriesList };
  return result;
};

const playProjectCharts = (data, type) => {
  if (data === null || data.length === 0) {
    return {
      series: [],
      xData: [],
      legendList: [],
    };
  } else {
    // 按datetime时间升序排列
    data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // 去重并按时间升序排列
    const uniqueDates = [...new Set(data.map((item) => item.datetime))].sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const obj = {
      series: [],
      xData: uniqueDates,
      legendList: [],
    };

    // 构建series数组
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.projectName]) {
        acc[item.projectName] = [];
      }
      acc[item.projectName].push(item[type]);
      return acc;
    }, {});

    for (const projectName in groupedData) {
      obj.series.push({
        name: projectName,
        type: "line",
        data: uniqueDates.map((date) => {
          const correspondingItem = data.find(
            (item) => item.projectName === projectName && item.datetime === date
          );
          return correspondingItem ? correspondingItem[type] : null;
        }),
      });
    }

    // 构建legendList数组
    obj.legendList = Object.keys(groupedData);

    return obj;
  }
};

const playLongLinkCharts = (data, type) => {
  if (data === null || data.length === 0) {
    return {
      series: [],
      xData: [],
      legendList: [],
    };
  } else {
    // 按datetime时间升序排列
    data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // 去重并按时间升序排列
    const uniqueDates = [...new Set(data.map((item) => item.datetime))].sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const obj = {
      series: [],
      xData: uniqueDates,
      legendList: [],
    };

    // 构建series数组
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.mosName]) {
        acc[item.mosName] = [];
      }
      acc[item.mosName].push(item[type]);
      return acc;
    }, {});

    for (const mosName in groupedData) {
      obj.series.push({
        name: mosName,
        type: "line",
        data: uniqueDates.map((date) => {
          const correspondingItem = data.find(
            (item) => item.mosName === mosName && item.datetime === date
          );
          return correspondingItem ? correspondingItem[type] : null;
        }),
      });
    }

    // 构建legendList数组
    obj.legendList = Object.keys(groupedData);

    return obj;
  }
};
const playCommandCharts = (data, key) => {
  if (data === null || data.length === 0) {
    return {
      series: [],
      xData: [],
      legendList: [],
    };
  } else {
    data = transformKey(data);
    // 按statisticDate时间升序排列
    data.sort((a, b) => new Date(a.statisticDate) - new Date(b.statisticDate));

    // 去重并按时间升序排列
    const uniqueDates = [
      ...new Set(data.map((item) => item.statisticDate)),
    ].sort((a, b) => new Date(a) - new Date(b));

    const obj = {
      series: [],
      xData: uniqueDates,
      legendList: [],
    };

    // 构建series数组
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item[key]);
      return acc;
    }, {});

    for (const type in groupedData) {
      obj.series.push({
        name: type,
        type: "line",
        data: uniqueDates.map((date) => {
          const correspondingItem = data.find(
            (item) => item.type === type && item.statisticDate === date
          );
          return correspondingItem ? correspondingItem[key] : null;
        }),
      });
    }

    // 构建legendList数组
    obj.legendList = Object.keys(groupedData);

    return obj;
  }
};
const playCommandBarCharts = (data, key) => {
  if (data === null || data.length === 0) {
    return {
      series: [],
      xData: [],
      legendList: [],
    };
  } else {
    data = transformKey(data);
    // 按statisticDate时间升序排列
    data.sort((a, b) => new Date(a.statisticDate) - new Date(b.statisticDate));

    // 去重并按时间升序排列
    const uniqueDates = [
      ...new Set(data.map((item) => item.statisticDate)),
    ].sort((a, b) => new Date(a) - new Date(b));

    const obj = {
      series: [],
      xData: uniqueDates,
      legendList: [],
    };

    // 构建series数组
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item[key]);
      return acc;
    }, {});

    for (const type in groupedData) {
      obj.series.push({
        name: type,
        type: "bar",
        data: uniqueDates.map((date) => {
          const correspondingItem = data.find(
            (item) => item.type === type && item.statisticDate === date
          );
          return correspondingItem ? correspondingItem[key] : null;
        }),
      });
    }

    // 构建legendList数组
    obj.legendList = Object.keys(groupedData);

    return obj;
  }
};
const transformKey = (data) => {
  const typeMapping = {
    1: "设备",
    2: "容器",
    3: "应用",
  };
  data.forEach((res) => {
    if (typeMapping[res.type]) {
      res.type = typeMapping[res.type];
    }
  });
  return data;
};
module.exports = {
  playDevIdCharts,
  playProjectCharts,
  playLongLinkCharts,
  playCommandCharts,
  playCommandBarCharts
};
