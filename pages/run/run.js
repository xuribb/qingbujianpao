Page({
  data: {
    latitude: 0, 
    longitude: 0
  },
  onLoad() {
    wx.startLocationUpdateBackground({
      complete: res => {
        console.log(res);
      }
    });
  },
  locationChange(res) {}
})