// pages/student/classes/classes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "name": "物理", "teacher": "王老师", "do": "GO", "id": "1" }
    ]
  },

  /*go btn click*/
  fungo: function (e) {
    console.log(e);
    let id = e.target.id;
    wx.navigateTo({
      url: '../index/index?cId='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetClassesByStudent();
  },
  GetClassesByStudent: function () {
    let that = this;
    let sId = wx.getStorageSync("id");
    let url = getApp().globalData.urlconst + "api/v1/index/GetClassesByStudent";
    wx.request({
      url: url,
      data: {
        sId: sId
      },

      success: function (res) {
        var info = res.data['info'];
        console.log(info);
        for (var i = 0; i < info.length; i++) {
          var n = "listData[" + i + "].name";
          var a = "listData[" + i + "].teacher";
          var t = "listData[" + i + "].id";
          var d = "listData[" + i + "].do";

          that.setData({
            [n]: info[i].name,
            [a]: info[i].tId,
            [t]: info[i].id,
            [d]: 'Go'
          });
        }
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