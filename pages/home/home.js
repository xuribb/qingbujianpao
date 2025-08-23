Page({
  data: {
    latitude: 0,
    longitude: 0
  },
  onLoad() {
    wx.getLocation({
      type: "gcj02",
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    });
  }
})