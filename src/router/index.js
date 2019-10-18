import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {title: '清风明月-电脑商城'}
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {title: '清风明月-电脑商城'}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {title: '登陆账号'}
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {title: '注册账号'}
    }
  ]
})
