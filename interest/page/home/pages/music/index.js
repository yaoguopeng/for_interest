// page/music/index.js
const web_url = getApp().globalData.web_url;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    web_url: web_url,
    islandJoke: {},
    bg_img: '',
    islandJokeBg:{},
  },
  nextItem: function(){

  }
  ,
  previousItem: function(){
    wx.switchTab({
      url: '/page/home/index',
    });
  }
  ,
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
    // 获取随机的默认背景图
    this.setData({
      bg_img: '/page/home/resources/bg/bg' + Math.floor(Math.random()) + '.jpg'
    });

    // 获取背景图
    wx.request({
      url: web_url + '/island/background?backgroundType=JOKE',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        _self.setData({
          bg_img: web_url + res.data.entity.backgroundImagePath,
        });
      },
    })

    // 获取islandJoke
    let _self = this;
    wx.request({
      url: web_url + '/island/joke',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        // 图片本身为joke内容
        if (res.data.entity.content == '' && res.data.entity.imagePath !== '') {
          _self.setData({
            bg_img: web_url + res.data.entity.imagePath,
          });
        }else{
          // joke 内容为文字
          _self.setData({
            islandJoke: res.data.entity
          });
        }
      },
    })

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