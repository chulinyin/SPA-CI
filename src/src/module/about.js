import Module from './module'

class About extends Module {
  constructor(opt) {
    super(opt)
    this._templte = `
      <div class="about-content">
        <h2 class="title">子导航：</h2>
        <ul class="submenu">
          <li><a href="#/about/me">我xxx</a></li>
          <li><a href="#/about/you">你xxx</a></li>
        </ul>
        <h2 class="title">内容</h2>
        <p>这里是关于<span class="child"><span></p>
      </div>
    `
  }
  build(opt) {
    super.build(opt)
    this._body = document.createElement('div')
    this._body.innerHTML = this._templte
  }

  show(context) {
    super.show(context) 
  }
}

export default About;