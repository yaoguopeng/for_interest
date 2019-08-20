Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '首页',
      path: 'page/home/index'
    }
  },

  data: {
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
})
