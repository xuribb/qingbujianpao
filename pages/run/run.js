Page({
  data: {
    prepare: 3,
    time: "00:00:00",
    isRunning: false,
    timer: 0,
    distance: "0.000",
    speed: "0.00",
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
      wx.stopLocationUpdate();
    } else {
      wx.startLocationUpdateBackground({
        success: () => {
          const timer = setInterval(() => {
            let speed = this.data.distance * 1000 / this.timeStringToSeconds(this.data.time);
            speed = isNaN(speed) ? Number(this.data.speed) : speed;
            this.setData({
              time: this.incrementTime(this.data.time),
              speed: speed.toFixed(2)
            });
          }, 1000);
          this.setData({
            timer,
            isRunning: true
          });

          wx.onLocationChange(res => {
            const ary = this.data.points;

            const last = ary.at(-1);
            let distance = Number(this.data.distance) * 1000;
            if (last) {
              distance = this.calculateCloseDistance(last.latitude, last.longitude, res.latitude, res.longitude);
              distance += Number(this.data.distance) * 1000;
            }

            ary.push({
              latitude: res.latitude,
              longitude: res.longitude
            });

            this.setData({
              points: ary,
              distance: (distance / 1000).toFixed(3)
            });
          });
        },
        fail: res => {
          wx.showModal({
            content: '需要位置权限才能使用此功能',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          });
        }
      });
    }
  },
  async endRun() {
    const res = await wx.showModal({
      content: '确定要停止运动？'
    });
    if (res.cancel) {
      return;
    }
    if (this.data.points.length < 2) {
      wx.showToast({
        title: '本次运动标记不足，不汇入运动记录',
        icon: "none",
      });
      return setTimeout(wx.switchTab, 1500, {
        url: '/pages/home/home',
      });
    }

    const app = getApp();
    const {
      domain,
      openid
    } = app.globalData;

    wx.request({
      url: domain + '/user/setLine',
      method: "POST",
      data: {
        openid,
        points: this.data.points,
        distance: this.data.distance,
        speed: this.data.speed
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
  onLoad() {
    const timer = setInterval(() => {
      const tmp = this.data.prepare - 1;
      if (!tmp) {
        clearInterval(timer);
        this.tap();
      }
      this.setData({
        prepare: tmp
      });
    }, 1000);
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
  calculateCloseDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const meanLat = (lat1 + lat2) / 2 * (Math.PI / 180);
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const x = dLon * Math.cos(meanLat) * R;
    const y = dLat * R;
    return Math.sqrt(x * x + y * y);
  },
  timeStringToSeconds(timeStr) {
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return totalSeconds;
  }
})