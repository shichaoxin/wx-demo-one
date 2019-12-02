// pages/details/details.js
const services = require('../services/services-movies.js');
const pageServices = require('../../utils/page-services.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesInfo: {},
    showModel: '',
    transform: '',
    showDialog: false,
    evenationMoviceId: '',
    refresh: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var params = options.data;
    this.setData({
      evenationMoviceId: params
    })
    const value = await services.getMovicesDetailById(params);
    console.log(value);
    this.setData({
      moviesInfo: value
    })
  },

  // 下拉刷新
  onPullDownRefresh(e) {
    wx.showNavigationBarLoading();
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000)
    console.log(e)
  },
  onShareAppMessage: function(ops) {
    if (ops.from === 'view') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'xx小程序',
      path: 'pages/index/index?id=123&age=18', // 路径，传递参数到指定页面。
      imageUrl: '../../imgs/xx.png', // 分享的封面图
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  openComment() {
    this.showModal();
  },
  //显示对话框
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
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

  //隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
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
  },
  async submit(e) {
    this.hideModal();
    const time = pageServices.currentTime();
    console.log(app.globalData.userInfo);
    const userInfo = app.globalData.userInfo;
    // 组装model
    const evenaTionModel = {};
    evenaTionModel.time = time;
    evenaTionModel.contentText = e.detail.value.textarea
    evenaTionModel.evenaNum = 0;
    evenaTionModel.evenationMoviceId = this.data.evenationMoviceId;
    evenaTionModel.evenationPer = userInfo.nickName;
    evenaTionModel.evenationPeoId = '5de0793c9fa42c0a78badf85';
    evenaTionModel.evenationImg = userInfo.avatarUrl;
    const data = await services.addEvenation(evenaTionModel);
    wx.showLoading({
      title: '提交中  ...',
    });
    if (data) {
      this.setData({
        refresh: true
      })
    }
  },
  closeModal() {
    wx.hideLoading();
  },

  // 收藏电影----调用收藏的接口
  collect(e) {
    console.log(e)
    wx.showToast({
      title: '收藏成功', // 标题
      icon: 'success', // 图标类型，默认success
      duration: 3000 // 提示窗停留时间，默认1500ms
    })
  },
  // 购买电影
  purchse() {
    wx.navigateTo({
      url: '../purchse/purchse?params=' + this.data.evenationMoviceId
    })
  }
});