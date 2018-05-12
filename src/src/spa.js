let mws = [];

class SPA {
  add(mw) {
    if(typeof mw === 'function') {
      mws.push(mw)
    }
  }

  dispatch(context) {
    let index = 0
    let next = () => {
      let mw = mws[index++]
      if(mw) {
        mw(context, next)
      }
    }
    next()
  }
}

export default SPA