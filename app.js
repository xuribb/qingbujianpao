App({
    onLaunch() {
        const openid = wx.getStorageSync('openid');
        if (openid) {
            this.globalData.openid = openid;
        } else {
            const domain = this.globalData.domain;
            wx.login({
                success: res => {
                    if (res.code) {
                        wx.request({
                            url: domain + '/user/code2Session',
                            data: {
                                code: res.code
                            },
                            success: res => {
                                if (res.data.code) {
                                    wx.setStorage({
                                        key: "openid",
                                        data: res.data.data.openid,
                                    });
                                    this.globalData.openid = res.data.data.openid;
                                } else {
                                    wx.showToast({
                                        title: res.data.msg,
                                        icon: 'error'
                                    });
                                }
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
        }
    },
    globalData: {
        domain: "http://qingbujianpao.learn",
        openid: "",
    }
})