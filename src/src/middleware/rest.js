// 地址参数解析
function rest (opt) {
  let matchers = opt.matchers || []
  matchers.forEach((it, index, list) => {
    list[index] = str2matcher(it)
  })

  function str2matcher (url) {
    let rest = {
      url,
      keys: []
    }
    let reg = url.replace(/:(.+?)(?=\/|$)/g, (match, $1) => {
      rest.keys.push($1)
      return '([^/]+?)'
    })
    rest.matcher = new RegExp(`^${reg}$`, 'gi')
    console.log('reg', reg, rest.matcher)
    return rest
  }

  function getParams (path) {
    let rest = {}
    matchers.find(it => {
      let result = it.matcher.exec(path)
      if (result) {
        it.keys.forEach((key, index) => {
          rest[key] = result[index + 1] || ''
        })
        return true
      }
    })
    return rest
  }

  return function (context, next) {
    console.log('rest middleware dispatched')

    let req = context.request
    req.restParams = getParams(req.pathname)
    if (req.hash) {
      let hash = new URL(
        req.hash.substr(1),
        req.origin
      )
      context.hash = hash
      hash.restParams = getParams(hash.pathname)
    }

    next()
  }
}

export default rest
