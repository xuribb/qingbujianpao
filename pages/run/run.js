Page({
  data: {
    height: 0,
    polyline: [{
      points: [],
      color: '#58c16c',
      width: 6,
      borderColor: '#2f693c',
      borderWidth: 1
    }]
  },
  onLoad() {
    const info = wx.getWindowInfo();
    this.setData({
      height: info.windowHeight
    });

    wx.startLocationUpdateBackground();
    wx.onLocationChange(this.locationChange);
  },
  locationChange(res) {
    this.data.polyline[0].points.push({
      latitude: res.latitude,
      longitude: res.longitude
    });
    this.setData({
      polyline: this.data.polyline
    })
  }
})