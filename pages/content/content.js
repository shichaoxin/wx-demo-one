// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchState: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 初始值进行判断
    wx.getSetting({
      success: res => {
        // 如果存在userInfo则直接进去主页
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            switchState: true
          })
        }
      }
    })
  },
  onReady() {
    wx.getSetting({
      success: res => console.log(res)
    })
  },

  goToMeasuing(e) {
    // 第一次的时候跳转
    if (!this.data.switchState) {
      wx.navigateTo({
        url: '../measuring/measuring',
      });
      this.setData({
        switchState: true
      })
    }
  },
  bindgetuserinfo(e) {
    // 判断是否存在用户信信息---第一次显示
    if (!e.detail.userInfo) {
      console.log('===================')
      wx.navigateBack({
        delta: 0
      });
      this.setData({
        switchState: true
      })
    }
  },
  showToast() {
    wx.getSetting({
      success: res => {
        // 如果存在则直接进去主页面
        if (res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../measuring/measuring',
          });
        } else {
          wx.showModal({
            content: '你要打开授权才可以使用',
            success: res => {
              wx.openSetting();
            }
          })
        }
      }
    })
  }
})