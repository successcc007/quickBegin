// pages/main/index.js
var QR = require("../../../utils/qrcode.js");
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: '请输入课程编号',//默认二维码生成文本
    cId: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },
  onReady: function () { },
  Show: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
      // this.saveImg();
      // this.savePic();
     // this.UploadFile();
    }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        //  console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true        
        });

      },
      fail: function (res) {
        // console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  formSubmit: function (e) {
    var that = this;
    var url = e.detail.value.url;
    that.setData({
      maskHidden: false,
      cId: url
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 2000
    });
    var st = setTimeout(function () {
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url, "mycanvas", size.w, size.h);
      that.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 2000)

  },
  saveImg: function () {
    var that = this;
    var img = this.data.imagePath;
    var urlconst = getApp().globalData.urlconst + "api/v1/index/AddImgQrPath";

    convertCanvasToImage(mycanvas);

    wx.request({
      url: urlconst,
      data: {
        imgPath: img,
        id: that.data.cId
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值

      },
      success: function (res) {
        // console.log("res.data");
        // console.log(res.data);
      }
    })
  },
  //canvas转换成图片
  convertCanvasToImage: function (canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  },
  //保存到本地
  saveLocal: function () {
    //成功之后保存到本地
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //保存图片2
  savePic: function () {
    var that = this;
    wx.saveFile({
      tempFilePath: that.data.imagePath,
      success: function success(res) {
        console.log('saved::' + that.data.imagePath);
        console.log(res);

      },
      complete: function fail(e) {
        // console.log(e.errMsg);
        // console.log(e.savedFilePath);
      }
    });
  },

  //上传文件
  UploadFile: function () {
    var that = this;
    var img = this.data.imagePath;
    console.log(img);
    
    var urlconst = getApp().globalData.urlconst + "api/v1/index/AddImgQrPath";
    wx.uploadFile({
      url: urlconst,
      filePath: img,
      name: 'file',
      success: function (res) {
        var data = res.data
        console.log(data);
        //do something
      }
    })
  }
})