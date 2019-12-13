// pages/measuring/measuring.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchState: false
  },

  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.camera']) {
          this.setData({
            switchState: true
          })
        }
      }
    })
  },
  // 判断是不是第一次，不是则需要注册信息
  gToMeasure() {
    if (app.globalData.isFirst) {
      // 则是第一次 进入填写页面，当填写结束的时候则返回该页面
    } else {
      // 查询是否有摄像头权限
      wx.getSetting({
        success: res => {
          console.log(res);
          if (!this.data.switchState) {
            if (!res.authSetting['scope.camera']) {
              wx.authorize({
                scope: 'scope.camera',
                success: res => this.setData({
                  switchState: true
                }),
                fail: res => this.setData({
                  switchState: true
                })
              })
            }
          }
          if (this.data.switchState) {
            wx.getSetting({
              success: res => {
                if (!res.authSetting['scope.camera']) {
                  wx.openSetting();
                } else {
                  console.log('开始测量')
                  wx.navigateTo({
                    url: '../infos/infos',
                  })
                }
              }
            });
          }
        }
      })
    }

  },

  click() {

  },
  miniProgram() {
    console.log('==========================')
  },
  commitgetInfo() {
    // 添加授权的方法
    wx.authorize({
      scope: 'scope.record',
      success(res) {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        console.log(res);
        wx.startRecord()
        wx.authorize({
          scope: '',
        })
      }
    });
    wx.openSetting();
  },
  backHome() {
    wx.redirectTo({
      url: '../content/content',
    })
  },
  // 底部弹窗动画
  showAnimation() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(600).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 50)
  },
  // 隐藏动画
  hideAnimation() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(600).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})