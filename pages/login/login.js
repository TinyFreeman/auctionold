// pages/login/login.js
var app = getApp()
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var userInfo = wx.getStorageSync('userInfo')
    var openid = wx.getStorageSync('openids')
    var code = wx.getStorageSync('code')


    that.setData({
      userInfo: userInfo,
      openid: openid,
      code: code,
    })

    that.getUser()

  },

  getUser:function(){
    var that = this
    var postUrl = app.d.ceshiUrl + "user/index"
    util.getData(postUrl)
      .then(function (res) {
        that.setData({
          lists: res.data.lists
        });
      
      });

  },

 




  // abc:function(e){
  //   console.log(13456)
  // },

  //授权
  autho: function (e) {



    if (e.detail.errMsg == "getUserInfo:ok") {
      var avatarUrl = e.detail.userInfo.avatarUrl
      var nickname = e.detail.userInfo.nickName
      var data = [avatarUrl, nickname]
      var openid = wx.getStorageSync('openids')

      var arr = { username: nickname, headimg: avatarUrl, openid: openid}

      var that = this
      var postUrl = app.d.ceshiUrl + "user/addUser"
      util.getData(postUrl,arr)
        .then(function (res) {

          if(res.data.status == 1){
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
         

        });




    } 
  },






  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})