// pages/public/position/position.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    map_width: 380,
    map_height: 380,
    cId:'1'
  },

  /**
   * 定位
   */
  getLocation: function (e) {
    console.log(e)
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },
  /**
   * 定位2
   */
  getLocationInfo: function (cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
          that.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.currentPosition();
  },
  //show current position
  currentPosition: function () {
    var that = this;
    // 获取定位，并把位置标示出来
    that.getLocationInfo(function (locationInfo) {
      console.log('map', locationInfo);
      that.setData({
        longitude: locationInfo.longitude
        , latitude: locationInfo.latitude
        , markers: [
          {
            id: 0
            , iconPath: "../../image/ic_position.png"
            , longitude: locationInfo.longitude
            , latitude: locationInfo.latitude
            , width: 30
            , height: 30
          }
        ]
      })
    })

    //set the width and height
    // 动态设置map的宽和高
    wx.getSystemInfo({
      success: function (res) {
        console.log('getSystemInfo');
        console.log(res.windowWidth);
        that.setData({
          map_width: res.windowWidth
          , map_height: res.windowWidth
          , controls: [{
            id: 1,
            iconPath: '../../image/ic_location.png',
            position: {
              left: res.windowWidth / 2 - 8,
              top: res.windowWidth / 2 - 16,
              width: 30,
              height: 30
            },
            clickable: true
          }]
        })
      }
    })

  },
  getLocationInfo: function (cb) {
    var that = getApp();

    if (that.globalData.locationInfo) {
      cb(that.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function (res) {

        that.setData({
          longitude: res.longitude
          , latitude: res.latitude
          , markers: [
            {
              id: 0
              , iconPath: "../../image/ic_position.png"
              , longitude: res.longitude
              , latitude: res.latitude
              , width: 30
              , height: 30
            }
          ]
        })

      }
    })
  },

  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat()
    }
  },
  markertap(e) {
    console.log(e)
  },
  //发布定位
  senPosition: function () {
    let that = this;
    var urlconst = getApp().globalData.urlconst;
    var d = {
      longitude: that.data.longitude,
      latitude: that.data.latitude,
      cId: that.data.cId
    };
    if (wx.getStorageSync(type) == 0) {
      //学生
      urlconst += "api/v1/index/SetPosition";
      d = {
        longitude: that.data.longitude,
        latitude: that.data.latitude,
        cId: that.data.cId
      };
    }
      wx.request({
        url: urlconst,
        data: d,
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data);
        }
      })    
  },
  /** latitude: '',
    longitude: '',
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