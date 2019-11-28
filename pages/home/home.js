const getTitleServices = require('../services/getTitelServices');


var touchStartPosition = 0;//触摸时的原点
const index = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: [
      {
        name: '最新电影',
        id: '1',
      },
      {
        name: '推荐电影',
        id: '2'
      },
      {
        name: '即将上映',
        id: '3',
      },
      {
        name: '有待开发',
        id: '4'
      }
    ],
    imgId: '',
  },


  async onLoad() {
    // getTitleServices.getTilteMessage().then((val) => {
    //   console.log(val);
    // })
    // this.index = this.data.titleList.length;
    this.index = 0;
    this.data.titleList[0].corlorName = 'corlorName';
    this.setData({ titleList: this.data.titleList });
    this.setData({ imgId: this.data.titleList[0].id });
    const result = await getTitleServices.getTilteMessage();
  },
  getChange(e) {
    this.data.titleList.forEach((e) => {
      e.corlorName = ' ';
    });
    this.data.titleList[e.currentTarget.id].corlorName = 'corlorName';
    this.index = e.currentTarget.id;
    this.setData({
      titleList: this.data.titleList,
      imgId: e.currentTarget.dataset.item.id
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
          imgId: this.data.titleList[this.index].id
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
        this.index ++;
        this.data.titleList.forEach((e) => {
          e.corlorName = ' ';
        });
        this.data.titleList[this.index].corlorName = 'corlorName';
        this.setData({
          titleList: this.data.titleList,
          imgId: this.data.titleList[this.index].id
        });
      }
    }
  },

});