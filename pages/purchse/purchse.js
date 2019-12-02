const pageServices = require('../../utils/page-services.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    objectArray: [ // 对象数组
      {
        id: 0,
        name: '万达影院'
      },
      {
        id: 1,
        name: '银泰影院'
      },
      {
        id: 2,
        name: '华谊兄弟影院'
      },
      {
        id: 3,
        name: '百科影院'
      }
    ],
    dateValue: "", // 日期选中时间
    dateStart: "", // 日期开始时间
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.params, '当前电影的id')
    const currentTime = pageServices.currentTime();
    let currentDate = currentTime.slice(0, 10);
    this.setData({
      dateStart: currentDate,
      dateValue: currentDate
    })

  },
  bindPickerChange: function(event) {
    console.log('picker发送选择改变，携带值为', event.detail.value)
    this.setData({
      index: event.detail.value
    })
  },
  cancel: function(event) {
    console.log("取消了");
  },

  // 日期选择
  dateChange: function(event) {
    let date = event.detail.value;
    console.log(event);
    this.setData({
      dateValue: date
    });
  },
})