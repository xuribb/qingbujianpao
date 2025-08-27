Page({
  data: {
    records: []
  },
  toMap(event) {
    const _id = event.target.dataset.id;
    if (_id) {
      wx.navigateTo({
        url: '/pages/map/map?_id=' + _id,
      })
    }
  },
  onLoad(options) {
    const app = getApp();
    const {
      domain,
      openid
    } = app.globalData;

    wx.request({
      url: domain + '/user/getLine',
      method: "POST",
      data: {
        openid
      },
      success: res => {
        if (res.data.code) {
          res.data.data.forEach(item => {
            item.timestamp = this.format(item.timestamp);
          });
          this.setData({
            records: res.data.data
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error'
          });
        }
      }
    });
  },
  format(timestamp) {
    const date = new Date(Number(timestamp + "000"));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
})