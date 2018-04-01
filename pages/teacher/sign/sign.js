// pages/teacher/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cId:'',
    name:'',
    adress:'',
    time:''
  },
  

  navigateBack: function () {
    wx.navigateTo({      
      url: "../manage/manage"
    });
  },
  clksigninfo: function () {
    let that =this;
    wx.navigateTo({     
      url: '../sign/signinfo/signinfo?cId='+that.data.cId,
    })
  },
  clkmessage:function(){
    let that=this;
    wx.navigateTo({
      url: '../message/message?cId=' + that.data.cId,
    })
  },
  clkscore: function () {
    let that = this;
    wx.navigateTo({
      url: '../score/score?cId=' + that.data.cId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cId=options.cId;
    this.setData({
      cId:cId
    })
    var that =this;
    wx.request({
      url: 'http://localhost/wxopenClass/api/v1/index/GetClassSingle', //仅为示例，并非真实的接口地址      
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        cId:cId
      },      
      success: function (res) {
        var info = res.data['info'];
        console.log(info) 
        that.setData({
          name:info.name,
          adress:info.adress,
          time: info.stime
        })     
      }
    })  
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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