// pages/register/register.js
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

    var uid = wx.getStorageSync('uid')

    that.setData({
      uid:uid,
    })

  },

  userSubmit:function(e){

    var that = this
    var val = e.detail.value

    var num = val.num
    var identity = val.identity
    var tel = val.tel
    var realname = val.realname
    var classs = val.class
    var uid = that.data.uid


    if(classs == false){
      wx.showToast({
        title: '班级不能为空',
      })
      return false;
    }


    
    if (!util.regName(realname)) {
     
      wx.showToast({
        title: '姓名填写有误',
      })
      return false;
    }


    if (!util.regIdNo(identity)) {
      wx.showToast({
        title: '身份证填写有误',
      })
      return false;
    }

    if (!util.regTel(tel)) {
      wx.showToast({
        title: '手机号码有误',
      })
      return false;
    }

    var arr = { id: uid, tel: tel, identity: identity, realname: realname, number: num, class: classs}

    var that = this
    var postUrl = app.d.ceshiUrl + "user/saveProfile"
    util.getData(postUrl, arr)
      .then(function (res) {
        var status = res.data.status
        if (status == 1 ){
          wx.showToast({
            title: "学号已经存在！",
          })

        }else if(status == 2){
          wx.showToast({
            title: "身份证号已存在",
          })
        }else{
          wx.showToast({
            title: "注册成功",
          })
        }

      });

   
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})