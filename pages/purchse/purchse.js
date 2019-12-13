const pageServices = require('../../utils/page-services.js');
const anmations = require('../../utils/animations.js');
var touchStartPosition = 0; // 触摸时的原点
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    objectArray: [ // 对象数组
      {
        id: 0,
        name: '万达影院'
      },
      {
        id: 1,
        name: '银泰影院'
      },
      {
        id: 2,
        name: '华谊兄弟影院'
      },
      {
        id: 3,
        name: '百科影院'
      }
    ],
    dateValue: "", // 日期选中时间
    dateStart: "", // 日期开始时间
    index: 0,
    showModel: '',
    transform: '',
    showDialog: false,
    movieOnShow: [{
        id: 1,
        time: '2019-11-12 08:00',
        name: '我不是药神',
        price: 12
      },
      {
        id: 2,
        time: '2019-11-12 09:30',
        name: '小世界',
        price: 15
      },
      {
        id: 3,
        time: '2019-11-12 12:30',
        name: '食神',
        price: 45
      },
      {
        id: 4,
        time: '2019-11-12 14:30',
        name: '我不是药神',
        price: 20
      }
    ],
    list: [],
    chooseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.params, '当前电影的id')
    const currentTime = pageServices.currentTime();
    let currentDate = currentTime.slice(0, 10);
    if (app.globalData.movicesList.length === 0) {
      this.setData({
        totalPrice: 0
      })
    } else {
      let count = [];
      app.globalData.movicesList.forEach((e) => {
        count.push(e.price)
      });
      const sum = count.reduce((x, y) => x + y)
      this.setData({
        totalPrice: sum
      })
    }
    this.setData({
      dateStart: currentDate,
      dateValue: currentDate,
      chooseFilms: [...app.globalData.movicesList],
      chooseList: [...app.globalData.showMovies]
    });
  },
  bindPickerChange: function(event) {
    console.log('picker发送选择改变，携带值为', event.detail.value)
    this.setData({
      index: event.detail.value
    })
  },
  cancel: function(event) {
    console.log("取消了");
  },

  // 日期选择
  dateChange: function(event) {
    let date = event.detail.value;
    console.log(event);
    this.setData({
      dateValue: date
    });
  },

  openDialog() {
    this.showModal();
  },

  /**
   * @params
   * 点击下方的购物车的弹出的内容
   */
  showModal() {
    // 显示遮罩层
    // var animation = wx.createAnimation({
    //   duration: 400,
    //   timingFunction: "linear",
    //   delay: 0
    // })
    // this.animation = animation
    // animation.translateY(300).step()
    // this.setData({
    //   animationData: animation.export(),
    //   showModalStatus: true
    // })
    // setTimeout(function() {
    //   animation.translateY(0).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 50)
    this.setData({
      showModalStatus: true
    })
  },

  /**
   * 隐藏购物车的下方弹出框
   */
  hideModal() {
    // 隐藏遮罩层
    // var animation = wx.createAnimation({
    //   duration: 200,
    //   timingFunction: "linear",
    //   delay: 0
    // })
    // this.animation = animation
    // animation.translateY(300).step()
    // this.setData({
    //   animationData: animation.export(),
    // })
    // setTimeout(function() {
    //   animation.translateY(0).step()
    //   this.setData({
    //     animationData: animation.export(),
    //     showModalStatus: false
    //   })
    // }.bind(this), 200)
    this.setData({
      showModalStatus: false
    })
  },
  preventTouchMove() {},
  // chooseMovieTime(e) {
  //   const id = e.currentTarget.dataset.item.id;
  //   this.data.movieOnShow.forEach((e) => {
  //     e.color = '';
  //     e.huadong = '';
  //     if (id === e.id) {
  //       e.color = 'addColor';
  //       e.huadong = 'huadong'
  //     }
  //   });
  //   this.setData({
  //     movieOnShow: this.data.movieOnShow
  //   })
  // },
  touchStart(e) {
    touchStartPosition = e.touches[0].pageX; // 获取触摸时的原点
  },
  touchEnd(e) {
    console.log(e)
    var touchMove = e.changedTouches[0].pageX;
    const index = e.currentTarget.id;
    // 向左滑动   
    if (touchMove - touchStartPosition <= -40) {
      //执行切换页面的方法
      console.log('左边滑动');
      this.data.movieOnShow.forEach((e) => {
        e.showDialog = false;
      });
      this.data.movieOnShow[index].showDialog = true;
      this.setData({
        movieOnShow: this.data.movieOnShow
      })
      this.showAnimation();
    }
    if (touchMove - touchStartPosition >= -40) {
      console.log('向右边边滑动')
      this.data.movieOnShow[index].showDialog = false;
      this.setData({
        movieOnShow: this.data.movieOnShow
      });
      this.hideAnimations();
    }

  },
  // 滑动出现弹窗
  showAnimation() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateX(600).step()
    this.setData({
      animations: animation.export(),
      showDialog: true
    })
    setTimeout(function() {
      animation.translateX(0).step()
      this.setData({
        animations: animation.export()
      })
    }.bind(this), 100);
  },
  // 隐藏动画
  hideAnimations() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateX(600).step()
    this.setData({
      animations: animation.export(),
    })
    setTimeout(function() {
      animation.translateX(0).step()
      this.setData({
        animations: animation.export(),
      })
    }.bind(this), 200)
  },

  chooseMovies(e) {
    console.log(e, '点击的购物车')
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000
    });
    let item = e.currentTarget.dataset.item;
    this.commonIncrease(item);
  },
  // 关闭弹窗
  closeMask() {
    this.hideModal();
  },
  payMoney() {
    this.hideModal();
  },
  // 弹窗中增加票数
  increaseTickets(e) {
    const item = e.currentTarget.dataset.item;
    console.log(item);
    this.commonIncrease(item);
  },
  // 减少票数
  descriceTickets(e) {
    const item = e.currentTarget.dataset.item;
    app.globalData.showMovies.forEach((e) => {
      if (e.id === item.id) {
        e.sameObj.splice(0, 1);
      }
    });
    const index = app.globalData.movicesList.findIndex((e, index) => {
      if (e.price === item.price) {
        return e;
      }
    });
    console.log(index, '-------------------index');
    app.globalData.movicesList.splice(index, 1);
    console.log(app.globalData.movicesList)
    let count = [];
    if (app.globalData.movicesList.length === 0) {
      totalPrice: 0
    }
    else {
      app.globalData.movicesList.forEach((e) => {
        count.push(e.price)
      });
      const sum = count.reduce((x, y) => x + y)
      this.setData({
        totalPrice: sum
      });
      // 删除数组的长度（根据id）
      // app.globalData.movicesList.
      console.log(app.globalData.movicesList, '减少-----movicesList')
      console.log(app.globalData.showMovies, '减少')
      this.setData({
        chooseList: [...app.globalData.showMovies],
        chooseFilms: [...app.globalData.movicesList],
      });
      console.log(this.data.chooseFilms, '购物车中的数组的长度');
      console.log(this.data.chooseList, '弹框现实的数据')
    }
  },
  // 统一的方法处理增加票数的逻辑问题
  commonIncrease(item) {
    app.globalData.movicesList.push(item);
    // 聚合相同的电影的数组(根据对象中的name)
    let hash = {};
    let i = 0;
    var res = [];
    app.globalData.movicesList.forEach((item) => {
      let name = item.name;
      hash[name] ? res[hash[name] - 1].sameObj.push(item) : hash[name] = ++i && res.push({
        sameObj: [item],
        name: item.name,
        price: item.price,
        id: item.id
      })
    });
    app.globalData.showMovies = [...res];
    console.log(app.globalData.showMovies, '增加')
    let count = [];
    app.globalData.movicesList.forEach((e) => {
      count.push(e.price)
    });
    const sum = count.reduce((x, y) => x + y)
    this.setData({
      chooseList: [...app.globalData.showMovies],
      chooseFilms: [...app.globalData.movicesList],
      totalPrice: sum
    });
    console.log(this.data.chooseFilms, '购物车中的数组的长度');
    console.log(this.data.chooseList, '弹框现实的数据')
  }
})