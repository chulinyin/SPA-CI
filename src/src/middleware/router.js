import Module from "../module/module";

function router(opt) {
  let routers = opt.routers || {}
  let preModuleArr = []

  // '/a/b/c' => ["/a", "/a/b", "/a/b/c"]
  function parsePath(path) {
    if (path === '/') {
      return ['/']
    }

    let arr = []
    arr.unshift(path)
    while (path = path.replace(/\/[^/]+$/, '')) {
      arr.unshift(path)
    }
    return arr
  }

  return function (context, next) {
    console.log('router middleware dispatched')

    let name = context.hash && context.hash.pathname || context.request.pathname
    let curNameArr = parsePath(name)
    let curModuleArr = []

    let len = curNameArr.length
    for (let i = 0; i < len; i++) {
      let parent = curNameArr[i-1]
      let name = curNameArr[i]
      let module = routers[name]
      if (!module) {
        if(i == 0) window.location.hash = '#/404' 
        break
      }
      if(module instanceof Module) {
        curModuleArr[i] = module
      }else {
        curModuleArr[i] = module()
      }
    }

    Promise.all(curModuleArr).then(moduleArr => {
      const len = moduleArr.length;
      for (let i = 0; i < len; i++) {
        let parent = moduleArr[i-1]
        let module = moduleArr[i]
        if(typeof module.default === 'function') {
          module = module.default
        }
        if (!(module instanceof Module)) {
          console.log('new module',parent,  opt.routerConfig)
          module = new module(parent || opt.routerConfig)
          routers[name] = module
          module.build(context)
        }
        moduleArr[i] = module
        
        if(moduleArr[i] === preModuleArr[i]) {
          module.refresh(context)
        } else {
          if(preModuleArr[i]) {
            preModuleArr[i].hide()
          }
          moduleArr[i].show(context)
        }
      }  
      preModuleArr = moduleArr    
    })
  }
}

export default router