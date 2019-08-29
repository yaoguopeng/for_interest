// page/joke/index.js
var app = getApp();
const web_url = getApp().globalData.web_url;
// 背景音乐
const innerAudioContext = wx.createInnerAudioContext();
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
    mp3: 'http://192.168.1.107:2013/sound/music/bbffd77a-9751-4c31-a86b-b51dbc386589.m4a',

    // 背景音乐
    bgm: false,
  },
  nextItem: function(){
    wx.navigateTo({
      url: '/page/home/pages/test/index'
    })
  }
  ,
  previousItem: function(){
    wx.switchTab({
      url: '/page/home/index',
    });
  }
  ,

  // 背景音乐
  BGM: function (e) {
    let that = this;
    if (that.data.bgm) {
      that.setData({
        bgm: false,
      })
      innerAudioContext.pause(); /**  暂停音乐 */

    } else {
      that.setData({
        bgm: true,
        bgmImgAni: "bgmImgAni"
      })
      // 播放音乐
      innerAudioContext.autoplay = true
      innerAudioContext.loop = true
      innerAudioContext.src = that.data.mp3;
      innerAudioContext.play()

    }
  },
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