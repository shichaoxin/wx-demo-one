const animations = {
  // 显示动画 position为动画的位置是X,Y,Z
  showAnimation(position) {
    console.log(position)
    var animation = wx.createAnimation({
      duration: 800,
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
    return this.setData({
      animations: animation.export(),
      showDialog: true
    })
  },
  // 隐藏动画
  hideAnimation(position) {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translate + position + (300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translate + position + (0).step()
      this.setData({
        animationData: animation.export(),
        showDialog: false
      })
    }.bind(this), 200)
  },
}

module.exports = animations;