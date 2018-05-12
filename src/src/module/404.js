import Module from './module'

class NotFound extends Module {
  build(opt) {
    super.build(opt)
    this._body = document.createElement('div')
    this._body.innerHTML = '<h1>404</h1></h1><p>页面找不到啦～</p>'
  }

  show(context) {
    super.show(context) 
  }
}

export default NotFound;