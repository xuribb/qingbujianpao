// pages/juanzeng/juanzeng.js
Page({
  data: {
    wechat: "",
    alipay: ""
  },
  onLoad(options) {
    const app = getApp();
    const domain = app.globalData.domain;

    this.setData({
      wechat: `${domain}/images/wechat.jpg`,
      alipay: `${domain}/images/alipay.png`
    })
  }
})