// pages/teacher/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    adress: '',
    time: '',
    tId: '',
    cId: ''
  },
  clkqr: function () {
    wx.navigateTo({
      url: '../../../pages/public/main/index',
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  areaInput: function (e) {
    this.setData({
      adress: e.detail.value
    })
  },
  timeInput: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  navigateBack: function () {
    wx.navigateTo({
      url: '../manage/manage',
    });
  },
  doclick: function () {
    let that = this;
    var name = this.data.name;
    var adress = this.data.adress;
    var time = this.data.time;
    let tId = wx.getStorageSync("id");
    var url = getApp().globalData.urlconst + "api/v1/index/AddClass";
    wx.request({
      url: url,
      method: 'post',
      data: {
        name: name,
        adress: adress,
        time: time,
        tId: tId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          cId:res.data.info
        })
        console.log(that.data.cId);
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let tId = wx.getStorageSync("id");
    if (tId) {
      that.setData({
        tId: tId
      })
    } else {
      wx.redirectTo({
        url: '../../../publick/login/login',
      })
    }
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