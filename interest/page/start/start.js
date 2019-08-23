//login.js
//获取应用实例
const app = getApp()
const web_url = getApp().globalData.web_url;

Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    islandIndex:{}
  },
  goToIndex: function() {
    wx.switchTab({
      url: '/page/home/index',
    });
    // 背景音乐
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'http://192.168.1.107:2013/sound/music/bbffd77a-9751-4c31-a86b-b51dbc386589.m4a'
    backgroundAudioManager.play();
  },
  onLoad: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
  },
  onShow: function() {
    // 获取islandIndex
    let _self = this;
    wx.request({
      url: web_url + '/island/index',
      data: {
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        _self.setData({
          islandIndex : res.data.entity
        });
      },
    })
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});