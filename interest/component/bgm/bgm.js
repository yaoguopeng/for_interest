// /component/bgm.js

import wxappStore from "../../lib/Store.js";
// 背景音乐
const innerAudioContext = wx.createInnerAudioContext();
Component(wxappStore.createComp({
  properties: {
    
  },
  data: {
    playing: false,
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
  },

  ready: function () {
// 绑定全局状态
    this.getGlobalData({ globalDataKey: 'bgm', localDataKey: 'bgm' },
      { globalDataKey: 'playing', localDataKey: 'playing' });

    // 改变全局状态  
    this.store.commit({
      name: 'bgmMutation',
      payload: 'http://192.168.1.107:2013/sound/music/4da8ea03-cffe-4064-bf88-347e0eaacf39.mp3'
    })
  }
}))
