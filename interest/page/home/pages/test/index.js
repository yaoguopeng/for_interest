// 背景音乐
const innerAudioContext = wx.createInnerAudioContext()

import wxappStore from "../../../../lib/Store.js";

Page(
  wxappStore.createPage({
    data: {
      mp3: 'http://192.168.1.107:2013/sound/music/bbffd77a-9751-4c31-a86b-b51dbc386589.m4a',

      // 背景音乐
      bgm: false,
      localtime: ''
    },
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

    onLoad: function () {
      this.store.commit({
        name: 'testMutation',
        payload: '开始显示当前日期（内页）'
      });
    }
  },
    {
      mutations: {
        testMutation: function ({ setData, payload, data }) {
          setData({
            localtime: payload
          });
        }
      }
    }))