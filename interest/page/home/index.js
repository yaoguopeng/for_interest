// page/home/index.js
var app = getApp();
const web_url = app.globalData.web_url;
// 背景音乐
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    web_url: web_url,
    islandMotto: {},
    islandMusic:{},
    bg_img:'',
  },

  /** 音乐播放相关
   * 
   */
  // 背景音乐
  BGM: function (e) {
    let that = this;
    if (app.bgm_url) {
      app.setGlobalData({
        bgm_status: false,
      })
      innerAudioContext.pause(); /**  暂停音乐 */

    } else {
      app.setGlobalData({
        bgm_status: true,
        bgmImgAni: "bgmImgAni"
      })
      // 播放音乐
      innerAudioContext.autoplay = true
      innerAudioContext.loop = true
      innerAudioContext.src = app.bgm_url;
      innerAudioContext.play()

    }
  },
  // 获取播放音乐信息
  getMusic: function(){
    let _self = this;
    wx.createInnerAudioContext();
    wx.request({
      url: web_url + '/island/music',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        _self.setData({
          islandMusic: res.data.entity,
        });
      },
    })
  },
  /**
  * 后一个页面
  */
  nextItem: function () {
    wx.redirectTo({
      url: '/page/home/pages/music/index',
    });
  },
  /**
   * 前一个页面
   */
  previousItem: function () {
    wx.redirectTo({
      url: '/page/home/pages/joke/index',
    });
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
    let _self = this;
    // 获取音乐信息
    this.getMusic();
    // 获取随机的默认背景图
    this.setData({
      bg_img: '/page/home/resources/bg/bg' + Math.floor(Math.random()) + '.jpg'
    });

    // 获取背景图
    wx.request({
      url: web_url + '/island/background?backgroundType=MOTTO',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        _self.setData({
          bg_img: web_url + res.data.entity.backgroundImagePath,
        });
      },
    })

    // 获取islandIndex
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