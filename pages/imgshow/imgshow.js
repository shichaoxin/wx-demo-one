// pages/imgshow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgId: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    imgId: {},
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    dataLit:[
      {
        name: '1',
        id:'2'
      },
      {
        name: '2',
        id:'3'
      },
      {
        name: '3',
        id:'4'
      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseImg(e){
      var data = JSON.stringify(e.currentTarget.dataset.item);
      wx.navigateTo({
        url: '../details/details?data=' + data,
      })
    }
  },

  observers: {
    imgId(e) {
      console.log(e);
    }
  }
})
