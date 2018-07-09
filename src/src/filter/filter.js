class Filter {
  constructor (context, next, chain) {
    this._context = context
    this._next = next
    this._chain = chain
  }

  chain () {
    if (this._chain) {
      this._chain()
    }
  }

  next () {
    if (this._next) {
      this._next()
    }
  }

  doFilter () {

  }
}

export default Filter
