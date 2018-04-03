// pages/teacher/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: [
      {name: "理科1班", area: "安徽", time: "13:00", img_qrcode: "../../image/001.jpg", id: "1" },
    ]
  },
  addClick: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  doclick: function (e) {
    wx.navigateTo({
      url: '../sign/sign?cId=' + e.target.id,
    })
  },
  //退出登录
  loginOut :function(){
    wx.clearStorageSync();
    wx.navigateTo({
      url: '../../public/login',
    })
  },
  clkDel: function (e) {
    let that = this;
    let cId = e.target.id;
    cId = cId.replace('delete', '');
    let url = getApp().globalData.urlconst + 'api/v1/index/DeleteClass';
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: cId
      },
      success: function (res) {
        console.log(res.data);
        wx.redirectTo({
          url: './manage',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let url = getApp().globalData.urlconst + 'api/v1/index/GetClasses';    
    wx.request({
      url: url, //仅为示例，并非真实的接口地址      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var info = res.data['info'];
        console.log(info)
        for (var i = 0; i < info.length; i++) {
          var n = "classes[" + i + "].name";
          var a = "classes[" + i + "].area";
          var t = "classes[" + i + "].time";
          var iq = "classes[" + i + "].img_qrcode";
          var id = "classes[" + i + "].id";
          that.setData({
            [n]: info[i].name,
            [a]: info[i].adress,
            [t]: info[i].stime,
            // [iq]: info[i].qcodeImage,
            [id]: info[i].id
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