import app from '../src/app.js'
import Home from '../src/module/home.js'
import About from '../src/module/about.js'
import AboutMe from '../src/module/about-me.js'
import AboutYou from '../src/module/about-you.js'
import NotFound from '../src/module/404.js'

/* eslint-disable */
app.start({
  matchers: [
    '/user/:uid'
  ],
  rules: [
    {
      matcher: /\/user\/[\d]+?$/,
      target: '/user'
    }
  ],
  routers: {
    '/': () => Home,
    '/user': () => import(/* webpackChunkName: 'user' */ '../src/module/user.js'),
    '/about': () => About,
    '/about/me': () => AboutMe,
    '/about/you': () => AboutYou,
    '/404': () => NotFound
  },
  routerConfig: {
    parent: document.querySelector('#app .content')
  }
})
/* eslint-enable */
