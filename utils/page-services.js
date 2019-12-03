const pageServices = {
  // 获取当前的时间
  currentTime() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const mintues = time.getMinutes();
    const seconds = time.getSeconds();
    const mm = month < 10 ? '0' + month : month;
    const dd = day < 10 ? '0' + day : day;
    const hh = hour < 10 ? '0' + hour : hour;
    const min = mintues < 10 ? '0' + mintues : mintues;
    const sec = seconds < 10 ? '0' + seconds : seconds;
    return year + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;
  },

  // 文件的上传到本地
  upLoadingFile() {
    // 选择对话再选择文件
    return new Promise((resolve, reject) => {
      let allpath = [];
      let allfilename = [];
      const newObject = {};
      const data = wx.chooseMessageFile({
        count: 10, // 能选择文件的数量
        type: 'file', // 能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
        success: (res) => {
          if (res.tempFiles.length > 0) {
            //循环比较
            for (var i = 0; i < res.tempFiles.length; i++) {
              var newupfilelist = allpath.concat(res.tempFiles[i].path) + ',';
              var newfilename = allfilename.concat(res.tempFiles[i].name) + ',' + '\n';
              newObject.allpath = newupfilelist;
              newObject.allfilename = newfilename;
              resolve(newObject)
            }
          }
        }
      });
    });
  },

  // 上传图片到本地
  upLoadImg() {
    let promise = new Promise((resolve, reject) => {
      let allpath = [];
      let allfilename = [];
      const newObject = {};
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera '],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          if (tempFilePaths.length > 0) {
            //循环比较
            for (var i = 0; i < tempFilePaths.length; i++) {
              var imgname = tempFilePaths[i].split("")[1].substring(tempFilePaths[i].split("")[1].length - 20, tempFilePaths[i].split("_")[1].length);
              var newupfilelist = allpath.concat(tempFilePaths[i]) + ',';
              var newfilename = allfilename.concat(imgname) + ',' + '\n';
              const newObject = {};
              newObject.allpath = newupfilelist;
              newObject.allfilename = newfilename;
              resolve(newObject)
            }
          }
        }
      });
    });
    return promise;
  },

  // 点击上传到服务器
  upLoaingToServices(data) {
    var allpaths = data.allpath.split(",");
    var allfilenames = data.allfilename.split(",");
    //将图片路径循环赋值给filePath参数
    for (var i = 0; i < allpaths.length - 1; i++) {
      var imgUrl = allpaths[i];
      var filename = allfilenames[i];
      wx.uploadFile({
        //上传图片的网路请求地址
        url: 'http:// ',
        //选择
        filePath: imgUrl,
        name: 'file',
        formData: {
          'ordId': orderinfId,
          'filename': filename,
          'userid': wx.getStorageSync('openId'),
          'unionid': wx.getStorageSync('unionId')
        },
        success: function(res) {
          wx.showToast({
            title: "发布成功",
            icon: "none"
          })
          // 加跳转
          wx.navigateBack({
            delta: 1,
            success: function(e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        },
        fail: function(res) {
          wx.showToast({
            title: "文件上传失败",
            icon: "none"
          })
        }
      });
    } //for循环结束 
  },

  /**
   * 上传单个文件
   */
  chooseMessageFile() {
    let promise = new Promise((resolve, reject) => {
      var that = this;
      const data = {};
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success(res) {
          var filename = res.tempFiles[0].name
          data.name = filename;
          resolve(data);
        }
      })
    });
    return promise;
  }

}

module.exports = pageServices;