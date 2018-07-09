import Module from './module'

class Home extends Module {
  build (opt) {
    super.build(opt)
    this._body = document.createElement('div')
    this._body.innerHTML = '这里是首页'
  }

  show (context) {
    super.show(context)
  }
}

export default Home
