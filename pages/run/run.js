Page({
  data: {
    latitude: 27.776341,
    longitude: 104.07254,
    polyline: [{
      points: [{
          latitude: 27.776341,
          longitude: 104.07254
        },
        {
          latitude: 27.775341,
          longitude: 104.07254
        },
        {
          latitude: 27.774341,
          longitude: 104.07254
        },
        {
          latitude: 26.774341,
          longitude: 104.07254
        },
        {
          latitude: 27.774341,
          longitude: 105.07254
        },
        {
          latitude: 25.774341,
          longitude: 104.07254
        },
      ],
      color: '#58c16c',
      width: 6,
      borderColor: '#2f693c',
      borderWidth: 1
    }]
  },
  onLoad() {
    // wx.onLocationChange(res => {
    //   this.setData({
    //     latitude: res.latitude,
    //     longitude: res.longitude
    //   });
    //   console.log('location change', res);
    // });

    // wx.startLocationUpdateBackground({
    //   complete: res => {
    //     console.log(res);
    //   }
    // });
  }
})