// pages/auction/auction.js
var  app = getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: ''
    , endDate2: '2018-11-07 11:41:00'
    , is_auc: 1
    ,auction:''
    , is_end:1
    , lang:'出价'
    , is_pay:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var pid = 3
    var openid = wx.getStorageSync('openids')
    var uid = wx.getStorageSync('uid')

    that.setData({
      pid:pid,
      openid:openid,
      uid:uid
    })

    that.getProduct(pid)
    that.getAuction(uid,pid)
    that.getCollect()
    
  },

  getAuction:function(uid,pid){
    var that = this
    var postUrl = app.d.ceshiUrl + "Auction/getAuction?pid=" + pid+'&uid='+uid
    util.getData(postUrl)
      .then(function (res) {
        
        that.setData({
          auction: res.data.list,
        });

      });

  },

  getProduct:function(pid){
    var that = this
    var auction  = that.data.auction
    var postUrl = app.d.ceshiUrl + "Product/getProduct?pid="+pid
    util.getData(postUrl)
      .then(function (res) {
        that.setData({
          list: res.data.list,
          enddate2: res.data.list.end_time,
          auc_price: res.data.list.auc_price,
          start_price: res.data.list.start_price,
        });

        //倒计时
        that.getTime(res.data.list.end_time)

      });
   


  },

  getTime(enddate2) {
    
    var that = this;

    var pid = that.data.pid
    var uid = that.data.uid

    if (enddate2 == undefined){
      enddate2 = that.data.enddate2
    }
    
    var leftTime = util.countTime(enddate2)
    if (leftTime >= 0) {
      var countdown = util.countMicTime(leftTime)
      that.setData({
        countdown: countdown
      })
     
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(that.getTime, 100);
    } else {

      //活动结束

      var postUrl = app.d.ceshiUrl + "Auction/getLastAuction?pid=" + pid
      util.getData(postUrl)
        .then(function (res) {
          var aid = res.data.list.id 
          wx.request({
            url: app.d.ceshiUrl + 'Auction/updateLastAuction?aid=' + aid,
            success:function(res){
              if (res.data.status == 1) { 
                that.setData({
                  auciton: that.getAuction(uid,pid)
                })
                wx.request({
                  url: app.d.ceshiUrl + 'Order/addOrder',
                  method:"POST",
                  data:{aid:aid,pid:pid,uid:uid},
                  header: { "content-type": 'application/x-www-form-urlencoded' },
                  
                })
              }
              
            }
          })
        });


      console.log('已截止')
      that.setData({
        countdown: '00:00:00',
        is_end: 0,
        lang: '已结束',
      })
    }

  },
  
  //拍卖入库
  auction:function(){
    var that = this

    var pid = that.data.pid
    var uid = that.data.uid
    var openid = that.data.openid
    var auc_price = that.data.auc_price
    var start_price = that.data.start_price


    var arr = { pid: pid, uid: uid, auc_price: auc_price, start_price: start_price}
    
    wx.showModal({
      title: '竞拍',
      content: '确定要竞拍该商品吗？',
      success:function(res){
        if(res.confirm){
          var postUrl = app.d.ceshiUrl + "Auction/addAuction"
          util.getData(postUrl, arr)
            .then(function (res) {
              if (res.data.status == 1) {
                wx.showToast({
                  title: '竞拍成功',
                  success:function(){
                    that.setData({
                      auction:that.getAuction(uid,pid),
                      list: that.getProduct(pid),
                      disabled:1
                    })

                  }
                })
              }else{
                wx.showToast({
                  title: '竞拍失败',
                })
              }
            });
        }
      }
    })
  },

  getCollect:function(){
    var that = this
    var uid = that.data.uid

    var postUrl = app.d.ceshiUrl + "Collect/getCollect?uid="+uid
    util.getData(postUrl)
      .then(function (res) {
        var is_collect = res.data.collect
        if(is_collect == 0){
          var lang_collect = '收藏'
        }else{
          var lang_collect = '已收藏'
        }
        
       
        that.setData({
          is_collect: is_collect,
          lang_collect: lang_collect
        });
      });

  },

  collect:function(){
    var that = this
    var uid = that.data.uid

    var postUrl = app.d.ceshiUrl + "Collect/updateCollect?uid=" + uid
    util.getData(postUrl)
      .then(function (res) {
        if(res.data.status==0){
          wx.showToast({
            title: '收藏成功',
            success:function(){
              that.setData({
                is_collect: that.getCollect(uid),
                
              });
            }
          })
        }else{
          wx.showToast({
            title: '取消收藏成功',
            success: function () {
              that.setData({
                is_collect: that.getCollect(uid),

              });
            }
          })
        }
        
      });
  },




  onPullDownRefresh: function () {

    var that = this;

    var uid = that.data.uid
    var pid = that.data.pid

    setTimeout(() => {
      // 模拟请求数据，并渲染
      that.getAuction(uid, pid) 
      that.getProduct(pid)
      // that.setData({ auction: });
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
    }, 100);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})