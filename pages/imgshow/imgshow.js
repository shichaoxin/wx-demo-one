// pages/imgshow.js
const services = require('../services/services-movies.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgId: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    dataLit: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseImg(e) {
      // var data = JSON.stringify(e.currentTarget.dataset.item);
      // console.log(e.currentTarget.dataset.item._id)
      wx.navigateTo({
        url: '../details/details?data=' + e.currentTarget.dataset.item._id,
      })
    }
  },
  observers: {
    async imgId(e) {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      });
      const data = await services.getMoviceByTitle(e);
      if (data) {
        this.setData({
          dataLit: data
        });
        wx.hideToast();
      }
    }
  }
})