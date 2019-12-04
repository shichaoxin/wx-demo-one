const pageServices = require('../../utils/page-services.js');
const anmations = require('../../utils/animations.js');
var touchStartPosition = 0; //触摸时的原点


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
      },
      {
        id: 2,
        time: '2019-11-12 09:30',
      },
      {
        id: 3,
        time: '2019-11-12 12:30',
      },
      {
        id: 4,
        time: '2019-11-12 14:30',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.params, '当前电影的id')
    const currentTime = pageServices.currentTime();
    let currentDate = currentTime.slice(0, 10);
    this.setData({
      dateStart: currentDate,
      dateValue: currentDate
    })

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
    if (touchMove - touchStartPosition > -40) {
      console.log('向右边边滑动')
      this.data.movieOnShow.forEach((e) => {
        e.showDialog = false;
      });
      this.setData({
        movieOnShow: this.data.movieOnShow
      })
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
    }.bind(this), 50);
  },
  // 隐藏动画
  hideAnimations() {
    var animation = wx.createAnimation({
      duration: 200,
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
        showDialog: false
      })
    }.bind(this), 200)
  }

})