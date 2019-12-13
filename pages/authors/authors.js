// pages/authors/authors.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCamera: false
  },
  switch1Change(e) {
    console.log(e.detail.value);
    if (e.detail.value) {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.camera']) {
            console.log(res);
            // // 开启授权
            wx.showModal({
              title: '授权',
              content: '开启授权',
              success: res => {
                console.log(res)
                wx.openSetting();
              }
            })
          }
        }
      })
    }
  },
  takePhoto() {
    // 判断是否授权，没有授权则进去授权设置页面
    wx.getSetting({
      success: res => {
        console.log(res);
        // 判断相机是否授权
        if (!res.authSetting['scope.camera']) {
          // 没有授权，则弹窗提示将其收取
          wx.showModal({
            title: '添加相机授权',
            success: res => {
              wx.openSetting();
            }
          });
        }
      }
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        this.setData({
          src: res.tempImagePath
        })
      }
    });
    this.setData({
      showCamera: !this.data.showCamera
    });
  },
  error(e) {
    console.log(e.detail);
    this.setData({
      src: e.detail.tempImagePath
    })
  },
  // 扫描
  scanCode() {
    // 允许从相机和相册扫码
    wx.scanCode({
      // onlyFromCamera: true,  // 只允许从相机扫码
      success: (res) => {
        console.log(res)
      }
    });
  }
})