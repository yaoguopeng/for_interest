// page/home/index.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    lists: [],
    web_url: web_url,
    islandMotto: {},
    islandMottoBg:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }
    that.setData({
      user_id: that.data.user_id
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
    // 获取islandIndex
    let _self = this;
    wx.request({
      url: web_url + '/island/motto',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        _self.setData({
          islandMotto: res.data.entity
        });
      },
    })
    // 获取背景图
    wx.request({
      url: web_url + '/island/background',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        _self.setData({
          islandMottoBg: res.data.entity
        });
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