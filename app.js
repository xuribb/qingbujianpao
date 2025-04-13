App({
  onLaunch() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      return wx.switchTab({
        url: '/pages/me/me',
      });
    }

    wx.login({
      success: res => {
        const backend = this.globalData.backend;
        wx.request({
          url: `${backend}/Login2Register/isRegister`,
          data: {
            code: res.code
          },
          success: (res) => {
            if (res.data.code == 0) {
              wx.setStorage({
                key: 'userInfo',
                data: res.data.data,
                success: () => {
                  this.globalData.userInfo = res.data.data;
                  wx.switchTab({
                    url: '/pages/me/me',
                  })
                }
              });
            }
          }
        })
      }
    })
  },
  globalData: {
    backend: "http://learn.lujiawei",
    userInfo: null
  }
})