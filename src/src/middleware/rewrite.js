function rewrite(opt) {
  let rules = opt.rules || [];
  rules.forEach(it => {
    let target = it.target;
    if(typeof target !== 'function') {
      it.target = () => {
        return target
      }
    }

    let matcher = it.matcher
    if(typeof matcher === 'function') {
      return
    }
    if(typeof matcher === 'string') {
      it.matcher = (ctx) => {
        return ctx.hash.pathname === matcher
      }
      return
    }
    if(matcher instanceof RegExp) {
      it.matcher = (ctx) => {
        console.log(ctx)
        return matcher.test(ctx.hash && ctx.hash.pathname || ctx.request.pathname)
      }
      return
    }
  })

  return function(context, next) {
    console.log('rewrite middleware dispatched')
    
    let result = rules.find(it => {
      return it.matcher(context)
    })
    if(result) {
      let target = result.target()
      context.request.pathname = target
      if(context.hash) {
        context.hash.pathname = target
      }
    }
    next()
  }
}

export default rewrite