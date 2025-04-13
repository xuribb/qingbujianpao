Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    const app = getApp();
    this.setData({
      userInfo: app.globalData.userInfo
    });
  }
})