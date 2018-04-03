// pages/public/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    uname: '',
    pword: ''
  },
  nameInput: function (e) {
    this.setData({
      uname: e.detail.value
    })
  },
  pwordInput: function (e) {
    this.setData({
      pword: e.detail.value
    })
  },
  loginclick: function () {
    let name = this.data.uname;
    let pword = this.data.pword;
    let url = getApp().globalData.urlconst + 'api/v1/index/Login';

    wx.request({
      url: url,
      method: 'post',
      data: {
        uname: name,
        pword: pword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log("res.data")
        console.log(res.data)
        let t = res.data['info'];
        console.log(t);
        wx.setStorageSync("uname", t.uname);
        wx.setStorageSync("type", t.type);
        wx.setStorageSync("id", t.id);
        if (1 == t.type) {
          wx.navigateTo({
            url: '../teacher/manage/manage',
          })
        } else {
          wx.navigateTo({
            url: '../student/index/index',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = wx.getStorageSync("type");
    let id = wx.getStorageSync("id");
    if (id != null && id != undefined && id != '') {
      if (1 == t) {
        wx.navigateTo({
          url: '../teacher/manage/manage',
        })
      } else {
        wx.navigateTo({
          url: '../student/classes/classes',
        })
      }
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