//app.js

App({
  d: {
    Url: 'http://localhost/auction/public/index.php/index/',
    //ceshiUrl: 'http://localhost/discount/index.php/home/',
    ceshiUrl: 'http://localhost/auction/index.php/index/',
    imgUrl: 'http://localhost/auction/public/static/pro_images/',
    url: 'http://localhost/auction/public/',
    code: ''
  },
  onLaunch: function () {
    //test
    //测试啊测试啊


    // 展示本地存储能力
    var openid = ''
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录
    wx.login({

      success: res => {
        if (wx.getStorageSync('openids') == "" || wx.getStorageSync('openids') == null) {
          wx.setStorageSync('code', res.code)

          wx.request({
            url: this.d.ceshiUrl + 'User/getOpenId?code=' + res.code,
            data: {},

            success: function (res) {

              wx.setStorageSync('openids', res.data.openid)

              openid = res.data //返回openid
            }
          })

        }

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {

        if (res.authSetting['scope.userLocation'] == "" || res.authSetting['scope.userLocation'] == false) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.showModal({
          //   title: '123',
          //   content: '授权',
          // })

        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})