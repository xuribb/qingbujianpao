Page({
    data: {
        motto: '心中有信仰 前路不迷茫',
        userInfo: {
            avatarUrl: "",
            nickName: "",
        },
    },
    onLoad() {
        // const app = getApp();
        // this.setData({
        //     "userInfo.avatarUrl": app.globalData.backend + "/static/images/defaultAvatar.png",
        // });
    },
    toLogin() {
        const app = getApp();
        const domain = app.globalData.domain;

        wx.login({
            success(res) {
                if (res.code) {
                    wx.request({
                        url: domain + '/user/code2Session',
                        data: {
                            code: res.code
                        },
                        success(res) {
                            console.log(res);
                        }
                    });
                } else {
                    wx.showToast({
                        title: '登录失败：' + res.errMsg,
                        icon: 'error'
                    });
                }
            }
        });
        // wx.getUserProfile({
        //     desc: '获取用户昵称和头像',
        //     success: res => {
        //         const app = getApp();
        //         app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl;
        //         app.globalData.userInfo.nickName = res.userInfo.nickName;

        //         return console.log(res);
        //         // const app = getApp();
        //         // const backend = app.globalData.backend;
        //         // wx.request({
        //         //     url: `${backend}/Login2Register/register`,
        //         //     method: 'POST',
        //         //     data: {
        //         //         code: res.code,
        //         //         nickName: this.data.userInfo.nickName,
        //         //         avatarUrl: this.data.userInfo.avatarUrl
        //         //     },
        //         //     success: (res) => {
        //         //         if (res.data.code) {
        //         //             wx.showToast({
        //         //                 title: res.data.errmsg,
        //         //                 icon: 'error'
        //         //             });
        //         //         } else {
        //         //             wx.setStorage({
        //         //                 key: 'userInfo',
        //         //                 data: res.data.data,
        //         //                 success: () => {
        //         //                     app.globalData.userInfo = res.data.data;
        //         //                     wx.switchTab({
        //         //                         url: '/pages/me/me',
        //         //                     })
        //         //                 }
        //         //             });
        //         //         }
        //         //     }
        //         // })
        //     },
        //     fail: err => {
        //         wx.showToast({
        //             title: '获取用户CODE失败，稍后重试',
        //             icon: 'error'
        //         });
        //     }
        // });
    }
})