import Module from './module'

class UserName extends Module {
  // constructor(moduleInstance) {
  //   // this.parent = moduleInstance.
  // }

  build (opt) {
    super.build(opt)
    this._body = document.createElement('div')
    this._info = document.createElement('p')
    this._body.appendChild(this._info)
  }

  show (context) {
    super.show(context)
    let hash = context.hash
    this._updateInfo(hash.restParams.uid)
  }

  refresh (context) {
    super.refresh()
    let hash = context.hash
    this._updateInfo(hash.restParams.uid)
  }

  _updateInfo (uid) {
    this._info.innerHTML = `大家好，我是username${uid} ～`
  }
}

export default UserName
