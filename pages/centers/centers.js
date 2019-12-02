const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgInfo: '',
    userList: [{
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
      {
        name: '上传',
        id: '5'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.userInfo);
    this.setData({
      userInfo: app.globalData.userInfo,
      imgInfo: app.globalData.userInfo.avatarUrl
    })
  },
  chooseList(e) {
    if (e.currentTarget.dataset.item.id === '2') {
      const params = JSON.stringify(e.currentTarget.dataset.item);
      wx.navigateTo({
        url: '../buytickets/buytickets?params=' + params,
      })
    }
    if (e.currentTarget.dataset.item.id === '5') {
      console.log(e);
      this.upLoading();
    }
  },
  bindViewTap() {
    // 更换头像
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgPaths = res.tempFilePaths;
        that.setData({
          imgInfo: imgPaths[0]
        })
      }
    });
  },

  upLoading() {
    var that = this;
    wx.showActionSheet({
      itemList: ['选择文件', '拍照或相册'],
      success(res) {
        // res.tapIndex 为itemList中的值得索引
        console.log(res.tapIndex);
        if (res.tapIndex == 0) {
          // 选择对话再选择文件
          wx.chooseMessageFile({
            count: 10, //能选择文件的数量
            type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
            success(res) {
              console.log(res, '提交的日志')
              if (res.tempFiles.length > 0) {
                //循环比较
                // for (var i = 0; i < res.tempFiles.length; i++) {
                //   var newupfilelist = that.data.allpath.concat(res.tempFiles[i].path) + '';
                //   var newfilename = that.data.allfilename.concat(res.tempFiles[i].name) + '''
                //   that.setData({
                //     allpath: newupfilelist, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
                //     allfilename: newfilename //渲染到wxml方便用户知道自己选择了什么文件
                //   })
                // }
              }
            }
          })
        }
      }
    });
  }
})