// 背景音乐
const innerAudioContext = wx.createInnerAudioContext()

import wxappStore from "../../../../lib/Store.js";

Page(
  wxappStore.createPage({
    data: {
      bgm: 'http://192.168.1.107:2013/sound/music/bbffd77a-9751-4c31-a86b-b51dbc386589.m4a',

      // 背景音乐
      playing: false,
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
        innerAudioContext.src = that.data.bgm;
        innerAudioContext.play()

      }


    },

    onLoad: function () {
      this.store.commit({
        name: 'bgmMutation',
        payload: 'http://192.168.1.107:2013/sound/music/4da8ea03-cffe-4064-bf88-347e0eaacf39.mp3'
      });
    }
  },
    {
      mutations: {
        bgmMutation: function ({ setData, payload, data }) {
          setData({
            bgm: payload
          });
        }
      },
      actions:{

        bgmAction: function ({ commit, payload, data }) {
          commit({
            name: 'bgmMutation',
            payload: payload
          });
        }
      }
    }))