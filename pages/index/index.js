// pages/register/register.js
var app = getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.d.imgUrl

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.getBanner()

  },

  getBanner:function(){
    var that = this
    var postUrl = app.d.ceshiUrl + "Banner/getBanner"
    util.getData(postUrl)
      .then(function (res) {
        var banner = res.data.banner
        that.setData({
          banner: banner,
        });
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this

    var openid = wx.getStorageSync('openids')

    that.getUserByOpenId(openid)

    

    that.setData({
      openid:openid
    })

  },

  getUserByOpenId: function (openid){
    var that = this
    var postUrl = app.d.ceshiUrl + "user/getUserByOpenid?openid="+openid
    util.getData(postUrl)
      .then(function (res) {
        var user = res.data.user
        that.setData({
          user: user,
          tel:user.tel,
          identity: user.identity,
        });
        wx.setStorageSync('uid', user.id)
      });


  },

  auction: function () {
    var that = this

    var tel = that.data.tel
    var identity = that.data.identity


    if (tel == null || identity == null){
      wx.navigateTo({
        url: '/pages/register/register',
      })
    }else{
      wx.navigateTo({
        url: '/pages/auction/auction',
      })
    }

  },

  order:function(){
    wx.navigateTo({
      url: '/pages/order/order',
    })

  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

	//测试git提交
	//在git修改 本地pull
    //再次提交 push
})
