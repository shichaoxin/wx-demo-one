const servicesUtils = require('../services/services-movies.js');


const app = getApp()
var touchStartPosition = 0; //触摸时的原点
const index = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: [],
    imgId: '',
    movicesList: [],
    currentPage: 1,
    totalList: []
  },


  async onLoad() {
    // getTitleServices.getTilteMessage().then((val) => {
    //   console.log(val);
    // })
    // this.index = this.data.titleList.length;
    this.index = 0;
    const result = await servicesUtils.getTilteMessage();
    this.setData({
      titleList: result
    });
    this.data.titleList[0].corlorName = 'corlorName';
    this.setData({
      titleList: this.data.titleList,
      imgId: this.data.titleList[0]._id
    });
    await this.getInit(this.data.imgId);
  },
  // 点击选择信息 
  async getChange(e) {
    this.data.titleList.forEach((e) => {
      e.corlorName = ' ';
    });
    this.data.titleList[e.currentTarget.id].corlorName = 'corlorName';
    this.index = e.currentTarget.id;
    this.setData({
      titleList: this.data.titleList,
      imgId: e.currentTarget.dataset.item,
      currentPage: 1
    });
    await this.getInit(e.currentTarget.dataset.item);
  },
  touchStart(e) {
    touchStartPosition = e.touches[0].pageX; // 获取触摸时的原点
  },
  async touchEnd(e) {
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动   
    if (touchMove - touchStartPosition <= -40) {
      //执行切换页面的方法
      if (this.index === 0) {
        return;
      } else {
        this.index--;
        this.data.titleList.forEach((e) => {
          e.corlorName = ' ';
        });
        this.data.titleList[this.index].corlorName = 'corlorName';
        this.setData({
          titleList: this.data.titleList,
          imgId: this.data.titleList[this.index]._id,
          currentPage: 1
        });
        await this.getInit(this.data.imgId);
      }
    }
    // 向右滑动   
    if (touchMove - touchStartPosition >= 40) {
      console.log('向右滑动')
      //执行切换页面的方法
      if (this.index > this.data.titleList.length - 2) {
        return;
      } else {
        this.index++;
        this.data.titleList.forEach((e) => {
          e.corlorName = ' ';
        });
        this.data.titleList[this.index].corlorName = 'corlorName';
        this.setData({
          titleList: this.data.titleList,
          imgId: this.data.titleList[this.index]._id,
          currentPage: 1
        });
        await this.getInit(this.data.imgId);
      }
    }
  },

  // 下拉刷新
  async onPullDownRefresh(e) {
    wx.showNavigationBarLoading();
    this.data.currentPage++;

    const pageInfo = {};
    pageInfo.page = this.data.currentPage;
    pageInfo.size = 5;
    pageInfo.titleId = this.data.imgId;
    let result = await servicesUtils.getMoviceByPageAndSizeAndTitleId(pageInfo);
    this.setData({
      movicesList: [...this.data.movicesList, ...result.val]
    });
    if (result) {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }
    if(result.val.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '已经到底了....',
      });
    }
  },

  // 转发分享
  onShareAppMessage: function() {
    let sendinfo = {
      num: 1,
      nickName: "jack",
    }
    let str = JSON.stringify(sendinfo);
    return {
      title: '电影小程序',
      desc: '不错的电影图片',
      path: 'pages/index/index?sendinfo=' + sendinfo, // 路径，传递参数到指定页面。
      // imageUrl: '../../imgs/xx.png',// 分享的封面图
      success(res) {
        // 转发成功
        console.log('---111------');
        console.log("转发成功:" + JSON.stringify(res));
        console.log('--- shareTickets ---', res.shareTickets);
        if (res.shareTickets && res.shareTickets[0]) {
          //获取转发的详细信息
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res) {
              console.log('--- 错误信息 ---', res.errMsg);
              console.log('--- 包括敏感数据在内的完整转发信息的加密数据 ---', res.encryptedData);
              console.log('--- 错误信息 ---', res.iv);
            },
            fail() {
              console.log('----------error')
            }
          })
        }
      },
      fail(res) {
        // 转发失败
        console.log('---333------');
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  // 获取电影数据
  async getInit(titleId) {
    const pageInfo = {};
    pageInfo.page = 1;
    pageInfo.size = 5;
    pageInfo.titleId = titleId;
    let result = await servicesUtils.getMoviceByPageAndSizeAndTitleId(pageInfo);
    this.setData({
      movicesList: result.val
    });
  },

  enterInto(e) {
    console.log(e);
    wx.navigateTo({
      url: '../movies/movies?moviesId=' + e.target.id,
    })
  },
});