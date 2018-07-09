import Module from './module'

class AboutYou extends Module {
  build (opt) {
    super.build(opt)
    this._body = document.createElement('b')
    this._body.innerHTML = '你'
  }

  show (context) {
    super.show(context)
  }
}

export default AboutYou
