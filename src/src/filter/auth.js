import Filter from './filter'

class AuthFilter extends Filter {
  doFilter () {
    let api = 'https://www.easy-mock.com/mock/5ab7683f89962b05a31a311d/spa/login'
    fetch(api).then(res => res.json())
      .then(data => {
        if (data.code === 0) {
          console.log('登陆校验成功')
          super.next()
        } else {
          // 跳转到登陆
          window.location.hash = '#/login'
        }
      })
  }
}

export default AuthFilter
