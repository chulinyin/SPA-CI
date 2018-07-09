// 模块基类
class Module {
  constructor (config) {
    this._parent = config.parent || config._body.querySelector('.child')
  }

  build (opt) { }

  show (context) {
    if (this._body) {
      this._parent.innerHTML = ''
      this._parent.appendChild(this._body)
    }
  }

  refresh () {
    let childView = this._body.querySelector('.child')
    if (childView) {
      childView.innerHTML = ''
    }
  }

  hide () {
    let childView = this._body.querySelector('.child')
    if (childView) {
      childView.innerHTML = ''
    }
    // 缓存一下？
    // if(this._body) {
    //   let fragment = document.createDocumentFragment()
    //   fragment.appendChild(this._body)
    // }
  }
}

export default Module
