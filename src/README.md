## 单页系统设计


### 页面入口文件配置

``` javascript
import app from "../src/app.js";
import Home from "../src/module/home.js";
import About from "../src/module/about.js";
import AboutMe from "../src/module/about-me.js";
import AboutYou from "../src/module/about-you.js";
import NotFound from "../src/module/404.js";

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
    '/user': () => import(/* webpackChunkName: "user" */ '../src/module/user.js'),
    '/about': () => About,
    '/about/me': () => AboutMe,
    '/about/you': () => AboutYou,
    '/404': () => NotFound
  },
  routerConfig: {
    parent: document.querySelector('#app .content')
  }
})
```

### 路由规则规范
#### rest 参数解析
在 `matchers` 中可采用 `/path/:key` 的形式定义路由解析规则。rest 中间件会将规则转换为对应的正则表达式，当浏览器访问地址与正则匹配时，会从地址中解析出相应的 key 和 value ，并添加到中间件的 context 中。

**例子**
``` javascript
app.start({
  matchers: [
    '/user/:uid/:gid'
  ]
  // ...
})
```
rest 中间件会将 `/user/:uid/:gid` 转换为相应的正则表达式 `/^\/user\/([^\/]+?)\/([^\/]+?)$/gi`，当浏览器访问 `/user/123/456` 时，中间件的 context 中会增加相应的 rest 对象 `{ uid: 123, gid: 456 }` 。

#### rewrite 重写校验
在 `rules` 中可采用 `{ matcher: RegExp, target:'/path' }` 的形式定义路由重写规则。当浏览器访问地址与 matcher 中的正则匹配时，rewrite 中间件会将 context 中的 path 重写为 target 的值，即会加载 target 值所对应的路由模块。

**例子**
``` javascript
app.start({
  rules: [
    {
      matcher: /\/user\/[\d]+?$/,
      target: '/user'
    }
  ]
  routers: {
    '/user':  User
  }
  // ...
})
```
当浏览器访问 `/user/123` 时，rewrite 中间件会将 context 中的 path 重写为 `'/user'` 的值，即最终会加载 User 模块。

#### router 路由模块（ based on UMI ）
在 `routers` 中可采用 `{ '/root/parent/child', function() { return xxModule } }` 的形式定义路由模块。最终中间件 context 中的 path 将会被解析为 pathTree 。pathTree 中的根模块会插入到 `routerConfig` 中的 `parent` DOM 节点中，而 pathTree 的子模块会插入到相应父模块的 `parentModule._body.querySelector('.child')` DOM 节点中，即父模块 `_body` 中 `class=child` 的节点会作为子模块的插槽。

- key 表示地址，其中 `'/m/m1'` 的父模块是 `'/m'` 模块
- value 表示模块，需使用函数，函数返回值需为同步或异步模块
- 异步模块需为 Promise 对象, 且 resolve 模块自身

**例子**
``` javascript
app.start({
  // ...
  routers: {
    '/user': () => import(/* webpackChunkName: "user" */ '../src/module/user.js'),
    '/about': () => About,
    '/about/me': () => AboutMe,
    '/about/you': () => AboutYou,
  },
  routerConfig: {
    parent: document.querySelector('#app .content')
  }
})
```
当浏览器访问 `/about/me` 时，页面会将 About 模块插入到 `routerConfig.parent` 指定的 DOM 节点中，然后再将 AboutMe 模块插入到 About 模块 `_body` 里 `class=child` 的节点中。
当浏览器访问 `/user` 时，页面才会加载相应的 user.js，即实现了文件动态加载。

### 路由模块规范
路由模块需继承于以下基类 
``` javascript
class Module {
  constructor(config) {
    // 父模块提供的 DOM 插槽
    this._parent = config.parent || config._body.querySelector('.child')
  }

  // 构建
  build(opt) {
    // create this._body
  }

  // 显示
  show(context) {
    if(this._body) {
      this._parent.innerHTML = ''
      this._parent.appendChild(this._body)
    }
  }

  // 刷新
  refresh() {
    let childView = this._body.querySelector('.child')
    if(childView) {
      childView.innerHTML = ''
    }
  }

  // 隐藏
  hide() {
    let childView = this._body.querySelector('.child')
    if(childView) {
      childView.innerHTML = ''
    }
  }
}
```