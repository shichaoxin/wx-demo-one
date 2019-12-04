// pages/movies/movies.js
const servicesMovies = require('../../pages/services/services-movies.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeHeight: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(options.moviesId, '电影的Id==========');
    const data = await servicesMovies.getMovicesDetailById(options.moviesId);
    console.log(data);
    this.setData({
      movices: data,
      movicesChamgeHeight: 'movies_des'
    })
  },

  increaseHeight() {
    if (this.data.changeHeight) {
      // 增加下拉框的长度
      this.setData({
        movicesChamgeHeight: 'increaseHeight',
        changeHeight: false
      })
    }
  },
  descHeight() {
    if (!this.data.changeHeight) {
      this.setData({
        movicesChamgeHeight: 'movies_des',
        changeHeight: true
      })
    }
  }
})