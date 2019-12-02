const servicesMovies = require('../../services/services-movies.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movicesId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    evenationList: []
  },

  /**
   *  在组件实例进入页面节点树时执行
   */
  lifetimes: {
    attached() {
      console.log(this.properties.movicesId, '==================')
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {

  },
  /**
   * 监听属性的变化
   */
  observers: {
    async movicesId(e) {
      if (!e) {
        console.log(e, '=======observe===============')
        return;
      } else {
        const result = await servicesMovies.getmoviesInfoMessage(e);
        this.setData({
          evenationList: result.reverse()
        });
      }
    }
  }
})