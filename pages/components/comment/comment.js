const servicesMovies = require('../../services/services-movies.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movicesId: {
      type: String,
      value: ''
    },
    refresh: {
      type: Boolean,
      value: false,
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
    async getInit(e) {
      const result = await servicesMovies.getmoviesInfoMessage(e);
      if (result) {
        this.setData({
          evenationList: result.reverse()
        });
        // 向父组件发送事件关闭弹窗
        this.triggerEvent('closeModal', true);
      }
    }
  },
  /**
   * 监听属性的变化
   */
  observers: {
    async movicesId(e) {
      if (!e) {
        return;
      } else {
        await this.getInit(e);
      }
    },
    async refresh(newValue) {
      if (newValue) {
        await this.getInit(this.properties.movicesId);
      } else {
        return;
      }
    }
  }
})