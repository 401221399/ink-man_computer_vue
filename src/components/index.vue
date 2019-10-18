<template>
  <body style="background-color: white; height: 100%;width: 100%;position: fixed;margin: 0;padding: 0;overflow-y:scroll;">
  <div class="header">
    <div class="site-topbar">
      <div class="container">
        <div class="topbar-nav">
          <router-link to=''  >清风明月</router-link><span class="sep">|</span>
          <router-link to=''  >电脑商城</router-link><span class="sep">|</span>
          <router-link to=''  >电脑评测</router-link><span class="sep">|</span>
          <router-link to=''  >硬件PK</router-link><span class="sep">|</span>
          <router-link to=''  >站内搜索</router-link><span class="sep">|</span>
        </div>
        <div id="J_miniCartTrigger" class="topbar-cart">
          <i class="iconfont icon-cart"></i>
          <router-link to=''  >购物车</router-link>
          <span style="color: #b0b0b0;" id="shopcar_num">(0)</span>
        </div>
        <div id="J_siteUserInfo" class="topbar-info">
          <router-link to='login'  >登陆</router-link><span class="sep">|</span>
          <router-link to='register'  >注册</router-link><span class="sep">|</span>
        </div>
      </div>
    </div>
    <div class="site-header ">
      <div class="container">
        <div class="logo" style="left: 0px;">
          <router-link to='index'  style="display: block;width: 100%;height: 100%;"></router-link>
        </div>
        <div class="header-nav ">
          <ul class="nav-list J_navMainList clearfix">
            <li id="J_navCategory" class="nav-category">
              <router-link to=''  ><span class="text"></span></router-link>
            </li>
            <li class="nav-item">
              <router-link to=''  ><span class="text">笔记本商城</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to=''  ><span class="text">硬件商城</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to=''  ><span class="text">硬件PK</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to=''  ><span class="text">笔记本评测</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to=''  ><span class="text">硬件评测</span></router-link>
            </li>
          </ul>
        </div>
        <div class="header-search ">
          <form id="J_searchForm" action="//search.mi.com/search" method="get" class="search-form clearfix"><label for="search" class="hide">站内搜索</label>
            <input type="search" id="search" name="keyword" autocomplete="off" class="search-text"/>
            <i class="iconfont icon-search search-btn"></i>
          </form>
        </div>
        </div>
    </div>
  </div>
  <div class="home-hero-container container">
    <div class="home-hero">
      <!--轮播图-->
      <div id="J_homeSwiper" class="swiper-container home-hero-swiper swiper-no-swiping swiper-container-fade swiper-container-initialized swiper-container-horizontal">
        <!--图片展示-->
        <div class="swiper-wrapper" style="transition-duration: 0ms;">
          <div class="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="4" style="width: 1226px; transition-duration: 0ms; opacity: 1; transform: translate3d(0px, 0px, 0px);">
            <router-link to='/'  ><img src="../assets/img/show_img1.jpg"/></router-link>
          </div>
        </div>
        <!--底下的切换按钮-->
        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
          <a class="swiper-pagination-bullet swiper-pagination-bullet_select" onclick="changeimg(1)"></a>
          <a class="swiper-pagination-bullet" onclick="changeimg(2)"></a>
          <a class="swiper-pagination-bullet" onclick="changeimg(3)"></a>
          <a class="swiper-pagination-bullet" onclick="changeimg(4)"></a>
        </div>
        <!--上一张按钮-->
        <div class="swiper-button-prev"></div>
        <!--下一张按钮-->
        <div class="swiper-button-next"></div>
      </div>
      <!--轮播左侧下滑栏-->
      <div class="site-category" style="display: block;">
        <ul id="J_categoryList" class="site-category-list clearfix site-category-list-custom">
          <li class="category-item"><router-link to='' class="title" >笔记本</router-link></li>
          <li class="category-item"><router-link to='' class="title" >CPU</router-link></li>
          <li class="category-item"><router-link to='' class="title" >GPU</router-link></li>
          <li class="category-item"><router-link to='' class="title" >内存</router-link></li>
          <li class="category-item"><router-link to='' class="title" >主板</router-link></li>
          <li class="category-item"><router-link to='' class="title" >SSD</router-link></li>
          <li class="category-item"><router-link to='' class="title" >硬盘</router-link></li>
          <li class="category-item"><router-link to='' class="title" >电源</router-link></li>
          <li class="category-item"><router-link to='' class="title" >机箱</router-link></li>
          <li class="category-item"><router-link to='' class="title" >显示器</router-link></li>
        </ul>
      </div>

      <div class="sub_banner center">
        <div class="sidebar fl">
          <div class="fl"><a href=""><img src="http://demo.cssmoban.com/cssthemes5/cpts_1293_byy//image/hjh_01.gif"></a></div>
          <div class="fl"><a href=""><img src="http://demo.cssmoban.com/cssthemes5/cpts_1293_byy//image/hjh_02.gif"></a></div>
          <div class="fl"><a href=""><img src="http://demo.cssmoban.com/cssthemes5/cpts_1293_byy//image/hjh_03.gif"></a></div>
          <div class="fl"><a href=""><img src="http://demo.cssmoban.com/cssthemes5/cpts_1293_byy//image/hjh_04.gif"></a></div>
          <div class="fl"><a href=""><img src="http://demo.cssmoban.com/cssthemes5/cpts_1293_byy//image/hjh_05.gif"></a></div>
          <div class="fl"><a href=""><img src="http://demo.cssmoban.com/cssthemes5/cpts_1293_byy//image/hjh_06.gif"></a></div>
          <div class="clear"></div>
        </div>
        <div class="datu fl"><a href=""><img src="../assets/img/item1.jpg" alt=""></a></div>
        <div class="datu fl"><a href=""><img src="../assets/img/item2jpg.jpg" alt=""></a></div>
        <div class="datu fl"><a href=""><img src="../assets/img/item3jpg.jpg" alt=""></a></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
export default {
  name: 'index',
  data () {},
  methods: {}
}
</script>

<style>
  @import "../assets/icon/iconfont.css";
  @import "../assets/css/index.css";
</style>
