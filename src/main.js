// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueSweetalert2 from './plugins/vue-sweetalert2'
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8089/'
//  发送请求时就会带上 sessionId
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueSweetalert2)

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  // 路由发生改变修改页面的title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    axios.get('/user/authentication/')// 判断是否登录
      .then(successResponse => {
        if (successResponse.data) next()
      })
      .catch(failResponse => { // 没登录则跳转到登录界面
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
