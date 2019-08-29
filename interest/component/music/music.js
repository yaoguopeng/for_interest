// /component/bgm.js
var app = getApp();
const web_url = app.globalData.web_url;
import wxappStore from "../../lib/Store.js";
// 背景音乐
const innerAudioContext = wx.createInnerAudioContext();
Component(wxappStore.createComp({
  properties: {
    
  },
  data: {
    web_url: web_url,
    islandMotto: {},
    islandMusic: {},
    playing: false,
    // bgm: 'http://192.168.1.107:2013/sound/music/bbffd77a-9751-4c31-a86b-b51dbc386589.m4a',
    bgm: '',
  },
  methods: {
    // 背景音乐
    BGM: function (e) {
      let that = this;
      if (that.data.playing) {
        that.setData({
          playing: false,
        })
        innerAudioContext.pause(); /**  暂停音乐 */

      } else {
        that.setData({
          playing: true,
          bgmImgAni: "bgmImgAni"
        })
        // 播放音乐
        innerAudioContext.autoplay = true
        innerAudioContext.loop = true
        innerAudioContext.src = that.data.bgm;
        innerAudioContext.play()

      }
    },
    // 获取播放音乐信息
    getMusic: function () {
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
  }
  ,

  ready: function () {
    this.getMusic();
    // this.getGlobalData({ globalDataKey: 'localtime', localDataKey: 'bgm' });

  }
}))
