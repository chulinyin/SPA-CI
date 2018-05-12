// 地址变化触发器
class Monitor {
  constructor(opt) {
    this._opt = opt || {}
    this._last = null
    window.setInterval(this.checkUrl.bind(this), 500)
  }

  checkUrl() {
    let url = window.location.href;
    if(url !== this._last) {
      let event = {
        oldValue: this._last,
        newValue: url
      }
      this._last = url
      if(typeof this._opt.onchange === 'function') {
        this._opt.onchange(event)
      }
    }
  }
}

export default Monitor