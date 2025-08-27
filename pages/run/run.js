Page({
  data: {
    time: "00:00:00",
    isRunning: false,
    timer: 0,
    points: []
  },
  tap() {
    if (this.data.isRunning) {
      clearInterval(this.data.timer);
      this.setData({
        isRunning: false,
        timer: 0
      });
      wx.offLocationChange();
    } else {
      const timer = setInterval(() => {
        this.setData({
          time: this.incrementTime(this.data.time)
        });
      }, 1000);
      this.setData({
        timer,
        isRunning: true
      });

      wx.onLocationChange(res => {
        const ary = this.data.points;
        ary.push({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.setData({
          points: ary
        });
        console.log('location change', res);
      });
    }
  },
  endRun() {
    const app = getApp();
    const {
      domain,
      openid
    } = app.globalData;

    clearInterval(this.data.timer);
    this.setData({
      isRunning: false,
      timer: 0
    });
    wx.offLocationChange();

    wx.request({
      url: domain + '/user/setLine',
      method:"POST",
      data: {
        openid,
        points: this.data.points
      },
      success: res => {
        if (res.data.code) {
          wx.redirectTo({
            url: '/pages/map/map?_id=' + res.data.data._id
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
  incrementTime(timeStr) {
    const parts = timeStr.split(':');
    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    let seconds = parseInt(parts[2]);

    seconds++;

    // 处理进位
    if (seconds >= 60) {
      seconds = 0;
      minutes++;

      if (minutes >= 60) {
        minutes = 0;
        hours++;

        if (hours >= 24) {
          hours = 0;
        }
      }
    }
    const format = (num) => num.toString().padStart(2, '0');
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  },

  onLoad() {
    const timer = setInterval(() => {
      this.setData({
        time: this.incrementTime(this.data.time)
      });
    }, 1000);

    this.setData({
      timer,
      isRunning: true
    });

    wx.onLocationChange(res => {
      const ary = this.data.points;
      ary.push({
        latitude: res.latitude,
        longitude: res.longitude
      });
      this.setData({
        points: ary
      });
      console.log('location change', res);
    });

    wx.startLocationUpdateBackground({
      complete: res => {
        console.log(res);
      }
    });
  }
})