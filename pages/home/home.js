const getTitleServices = require('../services/getTitelServices');

const app = getApp()
var touchStartPosition = 0;//触摸时的原点
const index = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: [],
    imgId: '',
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的页面', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20  // 此页面 页面内容距最顶部的距离
  },


  async onLoad() {
    // getTitleServices.getTilteMessage().then((val) => {
    //   console.log(val);
    // })
    // this.index = this.data.titleList.length;
    this.index = 0;
    const result = await getTitleServices.getTilteMessage();
    this.setData({ titleList: result });
    console.log(this.data.titleList);
    this.data.titleList[0].corlorName = 'corlorName';
    this.setData({ titleList: this.data.titleList });
    this.setData({ imgId: this.data.titleList[0]._id });
  },
  getChange(e) {
    this.data.titleList.forEach((e) => {
      e.corlorName = ' ';
    });
    this.data.titleList[e.currentTarget.id].corlorName = 'corlorName';
    this.index = e.currentTarget.id;
    this.setData({
      titleList: this.data.titleList,
      imgId: e.currentTarget.dataset.item._id
    });
  },
  touchStart(e) {
    console.log('开始滑动', e);
    touchStartPosition = e.touches[0].pageX; // 获取触摸时的原点
  },
  touchEnd(e) {
    console.log('滑动结束', e);
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动   
    if (touchMove - touchStartPosition <= -40) {
      //执行切换页面的方法
      console.log("向左滑动");
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
          imgId: this.data.titleList[this.index]._id
        });
      }
    }
    // 向右滑动   
    if (touchMove - touchStartPosition >= 40) {
      //执行切换页面的方法
      console.log("向右滑动");
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
          imgId: this.data.titleList[this.index]._id
        });
      }
    }
  },

});