import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/register'
import item from '@/components/item'
import mall from '@/components/mall'
import pk from '@/components/PK'
import Article from '@/components/Article'
import userInfo from '@/components/userInfo'
import admin from '@/components/admin'
import test from '@/components/test'
import search from '@/components/search'

Vue.use(Router)

export default new Router({
  model: history,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/index',
      meta: {title: '清风明月-电脑商城', requireAuth: true}
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {title: '清风明月-电脑商城'}
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {title: '测试'}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {title: '登陆账号'}
    },
    {
      path: '/item/:id/',
      name: 'item',
      component: item,
      meta: {title: '商品展示'}
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {title: '管理员界面'}
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {title: '注册账号'}
    },
    {
      path: '/mall',
      name: 'mall',
      component: mall,
      meta: {title: '电脑商城'}
    },
    {
      path: '/pk',
      name: 'pk',
      component: pk,
      meta: {title: '商品PK'}
    },
    {
      path: '/search/:word/',
      name: 'search',
      component: search,
      meta: {title: '搜索'}
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo,
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {title: '个人中心', requireAuth: true}
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article,
      meta: {title: '评测文章'}
    }
  ]
})
