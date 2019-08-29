// /component/bgm.js

import wxappStore from "../../lib/Store.js";
// 背景音乐
const innerAudioContext = wx.createInnerAudioContext();
Component(wxappStore.createComp({
  properties: {
    
  },
  data: {
    playing: false,
    bgm: 'http://192.168.1.107:2013/sound/music/bbffd77a-9751-4c31-a86b-b51dbc386589.m4a',
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
  }
  ,

  ready: function () {

    this.getGlobalData({ globalDataKey: 'localtime', localDataKey: 'localtimeData' });

    setInterval(() => {
      this.store.commit({
        name: 'testMutation',
        payload: (new Date()).toLocaleTimeString()
      })
    }, 1000)
  }
}))
