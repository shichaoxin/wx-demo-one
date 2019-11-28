const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userList:[
      {
        name: '观看历史',
        id: '1',
      },
      {
        name: '购票记录',
        id: '2',
      },
      {
        name: '电影收藏',
        id: '3',
      },
      {
        name: '我的喜欢',
        id: '4',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    this.setData({userInfo: app.globalData.userInfo})
  },
  chooseList(e) {
    console.log(e);
  }
})