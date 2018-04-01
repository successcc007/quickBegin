// pages/student/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "name": "物理", "time": "10：30", "detail": "详情", "operate": "上课" },
      { "name": "英语", "time": "09：10", "detail": "详情", "operate": "上课" },
      { "name": "数学", "time": "08：08", "detail": "详情", "operate": "上课" }
    ]
  },
  navigateBack: function () {
    wx.redirectTo({
      url: "../manage/manage"
    });
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