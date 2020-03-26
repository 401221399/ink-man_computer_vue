<template>
  <body style="background-color: white; height: 100%;width: 100%;position: fixed;margin: 0;padding: 0;overflow-y:scroll;">

  <!--黑色标题栏+logo标题栏-->
  <div class="header">
    <div class="site-topbar">
      <div class="container">
        <div class="topbar-nav">
          <router-link to='/index' target="_self" >清风明月</router-link><span class="sep">|</span>
          <router-link to="/mall" target="_self" >电脑商城</router-link><span class="sep">|</span>
          <router-link to='/Article' target="_self" >电脑评测</router-link><span class="sep">|</span>
          <router-link to='/PK' target="_self" >硬件PK</router-link><span class="sep">|</span>
          <router-link to='/search/index' target="_self" >站内搜索</router-link><span class="sep">|</span>
        </div>
        <div id="J_miniCartTrigger" class="topbar-cart">
          <i class="iconfont icon-cart" style="color: #b0b0b0;"></i>
          <router-link to=''  >购物车</router-link>
          <span style="color: #b0b0b0;" id="shopcar_num" v-text="'('+ShopCarNum+')'"></span>
        </div>
        <div id="J_siteUserInfo" class="topbar-info" v-show="isLogin">
          <router-link to="/userInfo" class="user-name" target="_blank"><span class="name" v-text="username"></span><i class="iconfont icon-moreunfold"></i></router-link>
          <div id="J_userMenuWrapper" class="user-menu-wrapper">
            <ul class="user-menu">
              <li><router-link to="/userInfo"  target="_blank">个人中心</router-link></li>
              <li><router-link to="/myOrder"  target="_blank" >我的订单</router-link></li>
              <li><router-link to="/myCollection" target="_blank" >我的收藏</router-link></li>
              <li><a @click="logout">退出登录</a></li>
            </ul>
          </div>
        </div>
        <div  class="topbar-info" v-show="!isLogin">
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
              <router-link to='/mall?classname=notebook' target="_blank"  ><span class="text">笔记本商城</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to='/mall?classname=cpu' target="_blank"  ><span class="text">硬件商城</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to='/PK' target="_blank"  ><span class="text">硬件PK</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to='/Article' target="_blank"  ><span class="text">笔记本评测</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to='/Article' target="_blank"   ><span class="text">硬件评测</span></router-link>
            </li>
          </ul>
        </div>
        <div class="header-search ">
          <div id="J_searchForm"  class="search-form clearfix"><label for="search" class="hide">站内搜索</label>
            <input  type="search"  id="search" name="keyword" autocomplete="off" class="search-text" :value="searchword" @input="inputchange"/>
            <i class="iconfont icon-search search-btn" @click="search()" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--右侧工具栏-->
  <div class="toolbar">
    <div class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-account" style="color: rgb(176, 176, 176);"></i></div>
      <span class="toolbar-text">个人中心</span>
    </div>
    <div class="toolbar-item" @mouseenter="showShopCarbox(true)" @mouseleave="showShopCarbox(false)">
      <div class="toolbar-ico"><i class="iconfont icon-cart" style="color: rgb(176, 176, 176);"></i></div>
      <span class="toolbar-text">购物车</span>
      <div  v-show="ShopCarboxshow" class="toolbar-box">
        <h4>购物车</h4>
        <ul class="pkul">
          <li v-for="(item,i) in ShopCarList" :key="i">
            <i class="iconfont icon-close" style="color:red;float: left;cursor: pointer" @click="delshopcar(item.id)"></i>
            <img :src="JSON.parse(item.imglist)[0]" width="60px" height="45px"/>
            <span v-text="item.name"></span>
            <span v-text="item.count+' * '+item.price" style="float: right"></span>
          </li>
          <router-link to="/myCollection">查看更多</router-link>
        </ul>
      </div>
    </div>
    <div class="toolbar-item" @mouseenter="showpkbox(true)" @mouseleave="showpkbox(false)">
      <div class="toolbar-ico"><i class="iconfont icon-icon_pk" style="color: rgb(176, 176, 176);"></i></div>
      <span class="toolbar-text">商品PK</span>
      <div  v-show="pkboxshow" class="toolbar-box">
        <h4>PK框</h4>
        <ul class="pkul">
          <li v-for="(item,i) in PKList" :key="i">
            <i class="iconfont icon-close" style="color:red;float: left;cursor: pointer" @click="delPKList(item.id)"></i>
            <img :src="JSON.parse(item.imglist)[0]" width="60px" height="45px"/>
            <span v-text="item.name"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-service" style="color: rgb(176, 176, 176);"></i></div>
      <span class="toolbar-text">人工服务</span>
    </div>
  </div>
  <!--轮播图+功能栏+广告栏-->
  <div class="home-hero-container container">
    <div class="home-hero">
      <!--轮播图-->
      <div id="J_homeSwiper" class="swiper-container home-hero-swiper swiper-no-swiping swiper-container-fade swiper-container-initialized swiper-container-horizontal">
        <!--图片展示-->
        <div class="swiper-wrapper" style="transition-duration: 0ms;">
          <div class="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="4" style="width: 1226px; transition-duration: 0ms; opacity: 1; transform: translate3d(0px, 0px, 0px);">
            <transition name="swiper-slide_transition">
              <div v-if="swiper_wrapper_opacity" style="position: absolute;width: 100%;height: 100%;z-index: 999;"><img :src="swiper_wrapper_img[currentIndex-1]"/></div>
            </transition>
            <router-link to='/item/1120' ><img :src="swiper_wrapper_img[currentIndex]"/></router-link>
          </div>
        </div>
        <!--底下的切换按钮-->
        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
          <a :class="currentIndex==0?'swiper-pagination-bullet swiper-pagination-bullet_select':'swiper-pagination-bullet'" @click="swiper_wrapper_change(0)"></a>
          <a :class="currentIndex==1?'swiper-pagination-bullet swiper-pagination-bullet_select':'swiper-pagination-bullet'" @click="swiper_wrapper_change(1)"></a>
          <a :class="currentIndex==2?'swiper-pagination-bullet swiper-pagination-bullet_select':'swiper-pagination-bullet'" @click="swiper_wrapper_change(2)"></a>
          <a :class="currentIndex==3?'swiper-pagination-bullet swiper-pagination-bullet_select':'swiper-pagination-bullet'" @click="swiper_wrapper_change(3)"></a>
        </div>
        <!--上一张按钮-->
        <div class="swiper-button-prev" @click="swiper_wrapper_change(currentIndex-1)"></div>
        <!--下一张按钮-->
        <div class="swiper-button-next"  @click="swiper_wrapper_change(currentIndex+1)"></div>
      </div>
      <!--轮播左侧下滑栏-->
      <div class="site-category" style="display: block;">
        <ul id="J_categoryList" class="site-category-list clearfix site-category-list-custom">
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=notebook' target="_blank" class="title" >笔记本</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['notebook']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=cpu' target="_blank" class="title" >CPU</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['cpu']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=vga' target="_blank" class="title" >GPU</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['vga']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=memory' target="_blank" class="title" >内存</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['memory']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=mb' target="_blank" class="title" >主板</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['mb']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=dianziyingpan' target="_blank" class="title" >SSD</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['dianziyingpan']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=harddisk' target="_blank" class="title" >硬盘</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['harddisk']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=power' target="_blank" class="title" >电源</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['power']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=case' target="_blank" class="title" >机箱</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i <=23" v-for="(item,i) in data['case']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
          <li class="category-item" @mouseenter="showdiv($event)" @mouseleave="hidediv($event)" >
            <router-link to='/mall?classname=sanre' target="_blank" class="title" >散热器</router-link>
            <div style="display: none" class="children clearfix children-col-4">
              <ul class="children-list children-list-col children-list-col-1" style="width: 100%" >
                <li v-if="data!=null && i<=23" v-for="(item,i) in data['sanre']" :key="i">
                  <router-link :to="'/item/'+item.id" target="_blank">
                    <img style="width:50px;height:35px" class="thumb" :src="JSON.parse(item.imglist)[0]"/>
                    <span class="text" v-text="item.name"></span>
                  </router-link></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="sub_banner center">
        <div class="sidebar fl">
          <router-link to='/login' class="xfl"><i class="iconfont icon-account"></i>用户登录</router-link>
          <router-link to='/register' class="xfl"><i class="iconfont icon-add-account"></i>用户注册</router-link>
          <router-link to='/search' class="xfl"><i class="iconfont icon-search"></i>站内搜索</router-link>
          <router-link to='' class="xfl"><i class="iconfont icon-creditlevel"></i>VIP服务</router-link>
          <router-link to='' class="xfl"><i class="iconfont icon-service"></i>联系客服</router-link>
          <router-link to='' class="xfl"><i class="iconfont icon-warning"></i>举报</router-link>

          <div class="clear"></div>
        </div>
        <div class="datu fl"><a ><img src="../assets/img/item1.jpg" alt=""></a></div>
        <div class="datu fl"><a ><img src="../assets/img/item2jpg.jpg" alt=""></a></div>
        <div class="datu fl"><a ><img src="../assets/img/item3jpg.jpg" alt=""></a></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>

  <!--商品展示模块-->
  <div class="page-main home-main">
    <div class="container">
      <!--笔记本商品展示-->
      <div class="home-brick-box home-brick-row-2-box xm-plain-box">
        <!--标题-->
        <div class="box-hd">
          <h2 class="title">笔记本电脑</h2>
          <div class="more"><router-link to='' class="more-link">查看全部<i class="iconfont icon-more"></i></router-link></div>
        </div>
        <div class="box-bd clearfix">
          <div class="row">
            <!--左边占两行一列商品图-->
            <div class="span4">
              <ul class="brick-promo-list clearfix">
                <li class="brick-item brick-item-l"><router-link to=""><img src="../assets/img/show1.jpg"/></router-link></li>
              </ul>
            </div>
            <!--右边4*4商品展示-->
            <div class="span16">
              <ul class="brick-list clearfix">
                <li class="brick-item brick-item-m brick-item-m-2" v-if="data!=null &&i <=7" v-for="(item,i) in data['notebook']" :key="i">
                  <router-link :to="'/item/'+item.id">
                    <div class="figure figure-img"><img :src="JSON.parse(item.imglist)[0]" width="100%" height="100%" :alt="item.name" lazy="loaded" /></div>
                    <h3 class="title" v-text="item.name"></h3>
                    <p class="desc" v-text="item.profile"></p>
                    <p class="price"><span class="num" v-text="item.price"></span>元<span>起</span><!----></p>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--广告条幅-->
      <div class="home-banner-box"><router-link to="" target="_blank"><img src="../assets/img/show3.jpg"  width="1226" height="120" lazy="loaded" /></router-link></div>
      <!--cpu商品展示-->
      <div class="home-brick-box home-brick-row-2-box xm-plain-box">
        <!--标题-->
        <div class="box-hd">
          <h2 class="title">CPU</h2>
          <div class="more"><router-link to='' class="more-link">查看全部<i class="iconfont icon-more"></i></router-link></div>
        </div>
        <div class="box-bd clearfix">
          <div class="row">
            <!--左边占两行一列的两个商品图-->
            <div class="span4">
              <ul class="brick-promo-list clearfix">
                <li class="brick-item brick-item-m"><router-link to=""><img src="../assets/img/show4.jpg"/></router-link></li>
                <li class="brick-item brick-item-m"><router-link to=""><img src="../assets/img/show5.jpg"/></router-link></li>
              </ul>
            </div>
            <!--右边4*4商品展示-->
            <div class="span16">
              <ul class="brick-list clearfix">
                <li class="brick-item brick-item-m brick-item-m-2" v-if="data!=null &&i <=7" v-for="(item,i) in data['cpu']" :key="i">
                  <router-link :to="'/item/'+item.id">
                    <div class="figure figure-img"><img :src="JSON.parse(item.imglist)[0]" width="100%" height="100%" :alt="item.name" lazy="loaded" /></div>
                    <h3 class="title" v-text="item.name"></h3>
                    <p class="desc" v-text="item.profile"></p>
                    <p class="price"><span class="num" v-text="item.price"></span>元<span>起</span><!----></p>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!--底部div-->
  <div>
    <div class="site-footer">
      <div class="container">
        <div class="footer-service">
          <ul class="list-service clearfix">
            <li><router-link to=""><em class="iconfont icon-tools-hardware"></em>预约维修服务</router-link></li>
            <li><router-link to=""><em class="iconfont icon-7tianwuliyoutuihuo"></em>7天无理由退货</router-link></li>
            <li><router-link to=""><em class="iconfont icon-15tianwuliyoutuihuo"></em>15天免费换货</router-link></li>
            <li><router-link to=""><em class="iconfont icon-gifts"></em>满150元包邮</router-link></li>
            <li><router-link to=""><em class="iconfont icon-weizhi"></em>520余家售后网点</router-link></li>
          </ul>
        </div>
        <div class="footer-links clearfix">
          <dl class="col-links col-links-first">
            <dt>帮助中心</dt>
            <dd><router-link to="">账户管理</router-link></dd>
            <dd><router-link to="">购物指南</router-link></dd>
            <dd><router-link to="">订单操作</router-link></dd>
          </dl>
          <dl class="col-links">
            <dt>服务支持</dt>
            <dd><router-link to="">售后政策</router-link></dd>
            <dd><router-link to="">自助服务</router-link></dd>
            <dd><router-link to="">相关下载</router-link></dd>
          </dl>
          <dl class="col-links">
            <dt>线下门店</dt>
            <dd><router-link to="">电脑城</router-link></dd>
            <dd><router-link to="">服务热点</router-link></dd>
            <dd><router-link to="">授权体验店</router-link></dd>
          </dl>
          <dl class="col-links">
            <dt>关于我们</dt>
            <dd><router-link to="">了解我们</router-link></dd>
            <dd><router-link to="">加入我们</router-link></dd>
            <dd><router-link to="">投资者关系</router-link></dd>
          </dl>
          <dl class="col-links">
            <dt>关注我们</dt>
            <dd><router-link to="">新浪微博</router-link></dd>
            <dd><router-link to="">官方微信</router-link></dd>
            <dd><router-link to="">联系我们</router-link></dd>
          </dl>
          <dl class="col-links">
            <dt>特色服务</dt>
            <dd><router-link to="">VIP通道</router-link></dd>
            <dd><router-link to="">礼物码</router-link></dd>
            <dd><router-link to="">防伪查询</router-link></dd>
          </dl>
          <div class="col-contact">
            <p class="phone">000-123-4567</p>
            <p>周一至周日 8:00-18:00<br>（仅收市话费）</p>
            <router-link to="" class="btn btn-line-primary btn-small"><em class="iconfont icon-code"></em> 人工客服</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
export default {
  name: 'index',
  data: function () {
    return {
      isLogin: false,
      username: '',
      searchword: '',
      swiper_wrapper_img: [require('../assets/img/show_img1.jpg'), require('../assets/img/show_img2.jpg'), require('../assets/img/show_img3.jpg'), require('../assets/img/show_img4.jpg')],
      currentIndex: 0,
      swiper_wrapper_opacity: false,
      swiper_wrapper_opacity_time: null,
      ShopCarList: [],
      ShopCarNum: 0,
      ShopCarboxshow: false,
      PKList: [],
      pkboxshow: false,
      data: {'notebook': [],
        'cpu': [],
        'vga': [],
        'case': [],
        'power': [],
        'memory': [],
        'mb': [],
        'harddisk': [],
        'dianziyingpan': [],
        'sanre': []}
      // timer: setInterval(this.swiper_wrapper_change, 4000)
    }
  },
  methods: {
    search: function () {
      if (this.searchword === 'index' || this.searchword === '') {
        window.location.href = 'http://localhost:8090/#/search/index'
      } else {
        window.location.href = 'http://localhost:8090/#/search/' + this.searchword + '?page=1&limit=10'
      }
    },
    inputchange: function (e) {
      this.searchword = e.target.value
      if (e.target.value === '') this.searchword = 'index'
    },
    logout: function () {
      this.$axios.get('/user/logout')
        .then(successResponse => {
          window.location.reload()
        })
        .catch(failResponse => {
        })
    },
    swiper_wrapper_change (index) {
      if (index > (this.swiper_wrapper_img.length - 1)) this.currentIndex = 0
      else if (index < 0) this.currentIndex = 3
      else this.currentIndex = index
      this.swiper_wrapper_opacity = true

      this.swiper_wrapper_opacity_time = setTimeout(() => { // 设置延迟执行
        this.swiper_wrapper_opacity = false
      }, 100)
      clearTimeout(this.timer)

      // this.swiper_wrapper_opacity = true
    },
    showdiv (content) {
      content.target.childNodes[2].style = 'display:block'
    },
    hidediv (content) {
      content.target.childNodes[2].style = 'display:none'
    },
    getItem: function (classname) {
      this.$axios.get('/item/getItemList_index')
        .then(res => {
          this.data = res.data.data
        })
        .catch(failResponse => {
        })
    },
    getShopCarList: function () {
      this.$axios.get('/item_options/getShopcar_CollectionList/shopcar?page=1&size=3')
        .then(successResponse => {
          console.log(successResponse.data)
          this.ShopCarList = successResponse.data.data
          this.ShopCarNum = successResponse.data.count
        })
        .catch(failResponse => {
        })
    },
    delshopcar: function (id) {
      this.$axios.get('/item_options/del_Shopcar_Collection/' + id)
        .then(successResponse => {
          this.$swal({
            type: 'success',
            title: '提示',
            text: '移出购物车成功',
            showCloseButton: true,
            showCancelButton: false
          }).then((value) => {
            window.location.reload()
          })
        })
        .catch(failResponse => {
        })
    },
    showShopCarbox: function (ShopCarboxshow) {
      this.ShopCarboxshow = ShopCarboxshow
    },
    showpkbox: function (pkboxshow) {
      this.pkboxshow = pkboxshow
    },
    delPKList: function (id) {
      var cookies = this.getCookie('PKList')
      if (cookies !== undefined) {
        var pklist = JSON.parse(this.getCookie('PKList'))
        for (var i in pklist) {
          if (Number(pklist[i]) === Number(id)) pklist.splice(i, 1)
        }
      }
      this.setCookie('PKList', JSON.stringify(pklist), 365)
      this.$swal({
        type: 'success',
        title: '提示',
        text: '移除PK栏成功',
        showCloseButton: true,
        showCancelButton: false
      }).then((value) => {
        window.location.reload()
      })
    },
    getPKList: function () {
      var PKList = JSON.parse(this.getCookie('PKList'))
      for (var i in PKList) {
        this.$axios.get('/item/getItemByid/' + PKList[i])
          .then(successResponse => {
            this.PKList.push(successResponse.data.item)
          })
          .catch(failResponse => {
          })
      }
    },
    // 获取cookie
    getCookie: function (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) {
          return c.substring(name.length, c.length)
        }
      }
      return undefined
    },
    // 设置cookie
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + '; ' + expires
    }
  },
  mounted: function () {
    this.$axios.get('/user/authentication/')
      .then(successResponse => {
        if (successResponse.data) {
          this.isLogin = true
          this.username = successResponse.data.name
        } else {
          this.isLogin = false
        }
      })
      .catch(failResponse => {
        this.isLogin = false
      })
    this.getItem()
    this.getShopCarList()
    this.getPKList()
  }

}
</script>

<style>
  @import "../assets/icon/iconfont.css";
  @import "../assets/css/common.css";
  @import "../assets/css/index.css";
</style>
