//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showModal: false,
    progress_txt: 1,
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null,
    countNum: null,
    controller: false,
    countStep: 1,
    delBtnWidth: 160,
    data: [{
      content: "1",
      right: 0
    }, {
      content: "2",
      right: 0
    }, {
      content: "3",
      right: 0
    }, {
      content: "4",
      right: 0
    }, {
      content: "5",
      right: 0
    }, {
      content: "6",
      right: 0
    }, {
      content: "7",
      right: 0
    }, {
      content: "8",
      right: 0
    }, {
      content: "9",
      right: 0
    }, {
      content: "10",
      right: 0
    }],
    isScroll: true,
    windowHeight: 0,

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    console.log(options.sendinfo)
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowHeight: res.windowHeight
          });
        }
      });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 弹窗
   */
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  onReady: function() {
    this.drawProgressbg();
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
  },

  drawProgressbg: function() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(10); // 设置圆环的宽度
    ctx.setStrokeStyle('#ddd'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },
  // 分享
  onShareAppMessage: function() {
    console.log('分享了====================')
    // return {
    //   title: 'xxxx邀请函', //转发页面的标题
    //   path: '/pages/mine/agent/agent?user_id=' + getApp().globalData.openId  //转发页面的路径以及携带的参数
    //  //多参数可以这么传
    //   path: '/pages/mine/agent/agent?user_id=' + getApp().globalData.openId + "&id=" + this.data.id
    // }
  },
  countInterval: function() {
    // 设置倒计时 定时器 每1000毫秒执行一次，计数器count+1 ,耗时60秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 600) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 600 对应 1 做处理，计数器count=600的时候step=1
        */
        this.drawCircle(this.data.count / (600 / 2))
        this.data.count++;
      } else {
        // this.setData({
        //   progress_txt: "匹配成功"
        // });
        clearInterval(this.countTimer);
      }
    }, 100);
    this.countNum = setInterval(() => {
      this.data.countStep++;
      this.setData({
        progress_txt: this.data.countStep
      });
      if (this.data.progress_txt >= 60) {
        clearInterval(this.countNum);
        clearInterval(this.countTimer);
      }
    }, 1000);
  },
  drawCircle: function(step) {
    var context = wx.createCanvasContext('canvasProgress');
    // // 设置渐变
    context.setStrokeStyle('#07C160'); // 设置圆环的颜色
    // var gradient = context.createLinearGradient(200, 100, 100, 200);
    // gradient.addColorStop("0", "#2661DD");
    // gradient.addColorStop("0.5", "#40ED94");
    // gradient.addColorStop("1.0", "#5956CC");

    context.setLineWidth(10);
    // context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  startTime() {
    if (!this.data.controller) {
      this.drawProgressbg();
      this.countInterval();
      this.setData({
        controller: true
      })
    } else {
      clearInterval(this.countNum);
      clearInterval(this.countTimer);
      this.setData({
        controller: false
      })
    }
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.data[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        data: this.data.data
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
  },
  drawEnd: function (e) {
    var item = this.data.data[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
  },

  delItem: function (e) {

  }

})