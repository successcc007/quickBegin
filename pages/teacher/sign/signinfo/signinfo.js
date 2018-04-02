// pages/teacher/sign/signinfo/signinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "name": "张三", "state": "准时" }     
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
    let that=this;  
    let cId = options.cId;
    console.log(cId)
    let url = getApp().globalData.urlconst + 'api/v1/index/GetSignInfo';    

    wx.request({
      url: url, //仅为示例，并非真实的接口地址      
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        cId:cId
      },
      success: function (res) {
        console.log(res.data)        
        let info = res.data['info'];
        console.log(info)
        for (var i = 0; i < info.length; i++) {
          var n = "listData[" + i + "].name";
          var s = "listData[" + i + "].state";        
          that.setData({
            [n]: info[i].name,
            [s]: info[i].status           
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