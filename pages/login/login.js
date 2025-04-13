Page({
  data: {
    motto: '心中有信仰 前路不迷茫',
    userInfo: {
      avatarUrl: "",
      nickName: "",
    },
  },
  onLoad() {
    const app = getApp();
    this.setData({
      "userInfo.avatarUrl": app.globalData.backend + "/static/images/defaultAvatar.png",
    });
  },
  onChooseAvatar(e) {
    this.setData({
      "userInfo.avatarUrl": e.detail.avatarUrl
    });
  },
  onInputChange(e) {
    const nickName = e.detail.value;
    this.setData({
      "userInfo.nickName": nickName
    });
  },
  onRegister(e) {
    if (!this.data.userInfo.nickName) {
      return wx.showToast({
        title: '昵称不能为空',
        icon: 'error',
      });
    }

    wx.login({
      success: res => {
        const app = getApp();
        const backend = app.globalData.backend;
        wx.request({
          url: `${backend}/Login2Register/register`,
          method: 'POST',
          data: {
            code: res.code,
            nickName: this.data.userInfo.nickName,
            avatarUrl: this.data.userInfo.avatarUrl
          },
          success: (res) => {
            if (res.data.code) {
              wx.showToast({
                title: res.data.errmsg,
                icon: 'error'
              });
            } else {
              wx.setStorage({
                key: 'userInfo',
                data: res.data.data,
                success: () => {
                  app.globalData.userInfo = res.data.data;
                  wx.switchTab({
                    url: '/pages/me/me',
                  })
                }
              });
            }
          }
        })
      },
      fail: err => {
        wx.showToast({
          title: '获取用户CODE失败，稍后重试',
          icon: 'error'
        });
      }
    })
  }
})