import Monitor from './monitor'
import SPA from './spa'
import rest from './middleware/rest'
import history from './middleware/history'
import rewrite from './middleware/rewrite'
import filter from './middleware/filter'
import AuthFilter from './filter/auth'
import router from './middleware/router'

const spa = new SPA()

const app = {
  start (opt) {
    // 添加中间件
    spa.add(rest(opt))
    spa.add(history())
    spa.add(rewrite(opt))
    spa.add(filter.mw)
    filter.add(AuthFilter)
    spa.add(router(opt))

    // 添加触发器
    const monitor = new Monitor({ // eslint-disable-line
      onchange (e) {
        let context = {
          request: new URL(e.newValue)
        }
        spa.dispatch(context)
        activeNavigation(context)
      }
    })

    const menuEle = document.querySelector('#app .menu')
    let activeEle = null
    function activeNavigation (context) {
      const selector = `[href*="#${(context.hash && context.hash.pathname) || context.request.pathname}"]`
      const ele = menuEle.querySelector(selector)
      const targetEle = ele && ele.parentElement
      if (targetEle && activeEle !== targetEle) {
        activeEle && (activeEle.classList.remove('active'))
        targetEle.classList.add('active')
        activeEle = targetEle
      }
    }
  }
}

export default app
