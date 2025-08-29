Page({
  data: {
    latitude: 0,
    longitude: 0,
    distance: 0,
    speed: 0,
    polyline: []
  },
  onLoad(option) {
    const app = getApp();
    const {
      domain,
      openid
    } = app.globalData;

    wx.request({
      url: domain + '/user/getLine',
      method: "POST",
      data: {
        openid,
        _id: option._id
      },
      success: res => {
        if (res.data.code) {
          this.setData({
            latitude: res.data.data.points[0].latitude,
            longitude: res.data.data.points[0].longitude,
            distance: res.data.data.distance,
            speed: res.data.data.speed,
            polyline: [{
              points: res.data.data.points,
              color: '#58c16c',
              width: 6,
              borderColor: '#2f693c',
              borderWidth: 1
            }]
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error'
          });
        }
      }
    });
  }
})