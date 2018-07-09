import Module from './module'

class AboutMe extends Module {
  build (opt) {
    super.build(opt)
    this._body = document.createElement('b')
    this._body.innerHTML = '我'
  }

  show (context) {
    super.show(context)
  }
}

export default AboutMe
