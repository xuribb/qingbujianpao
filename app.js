App({
    onLaunch() {
        // const userInfo = wx.getStorageSync('userInfo');
        // if (userInfo) {
        //     this.globalData.userInfo = userInfo;
        //     return wx.switchTab({
        //         url: '/pages/me/me',
        //     });
        // }
    },
    globalData: {
        domain: "http://qingbujianpao.learn",
        userInfo: {
            avatarUrl: "",
            nickName: ""
        }
    }
})