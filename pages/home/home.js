Page({
  data: {
    latitude: 0,
    longitude: 0,
    domain: "",

    city: "",
    adm1: "",
    adm2: "",

    icon: "",
    temp: 0,
    feelsLike: 0,
    text: "",
    windDir: "",
    windScale: "",
    windSpeed: "",
    humidity: "",
    cloud: ""
  },
  getLocation() {
    wx.getLocation({
      type: "gcj02",
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });

        const location = `${this.data.longitude.toFixed(2)},${this.data.latitude.toFixed(2)}`;
        this.getWeather(location);
        this.getCity(location);
        setTimeout(wx.hideLoading);
      }
    });
  },
  getWeather(location) {
    wx.request({
      url: this.data.domain + '/weather/now',
      data: {
        location
      },
      success: res => {
        this.setData({
          temp: res.data.now.temp,
          feelsLike: res.data.now.feelsLike,
          text: res.data.now.text,
          windDir: res.data.now.windDir,
          windScale: res.data.now.windScale,
          windSpeed: res.data.now.windSpeed,
          humidity: res.data.now.humidity,
          cloud: res.data.now.cloud,
          icon: `${this.data.domain}/icons/${res.data.now.icon}.svg`
        });
      }
    })
  },
  getCity(location) {
    wx.request({
      url: this.data.domain + '/weather/city',
      data: {
        location
      },
      success: res => {
        this.setData({
          city: res.data.location[0].name,
          adm1: res.data.location[0].adm1,
          adm2: res.data.location[0].adm2,
        });
      }
    })
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const app = getApp();
    this.setData({
      domain: app.globalData.domain
    }, () => {
      this.getLocation();
    });
  },
  toRun() {
    wx.navigateTo({
      url: '/pages/run/run',
    })
  }
})