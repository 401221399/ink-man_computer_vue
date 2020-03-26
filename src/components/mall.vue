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
          <router-link to=''  >站内搜索</router-link><span class="sep">|</span>
        </div>
        <div id="J_miniCartTrigger" class="topbar-cart">
          <i class="iconfont icon-cart" style="color: #b0b0b0;"></i>
          <router-link to=''  >购物车</router-link>
          <span style="color: #b0b0b0;" id="shopcar_num">(0)</span>
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
    <div class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-cart" style="color: rgb(176, 176, 176);"></i></div>
      <span class="toolbar-text">购物车</span>
    </div>
    <div class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-icon_pk" style="color: rgb(176, 176, 176);"></i></div>
      <span class="toolbar-text">商品PK</span>
    </div>
    <div class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-service" style="color: rgb(176, 176, 176);"></i></div>
      <span class="toolbar-text">人工服务</span>
    </div>
  </div>
  <div class="selectbox">
    <div class="hd">
      <a href="javascript:void(0);" class="current">所有商品</a>
    </div>
    <div class="bd">
      <div class="filter-brand">
        <div class="prop-name">商品类型：</div>
        <div class="prop-values">
          <div class="filter-option filter-tab">
            <div class="tab-content" style="display: block;">
              <div :class="classname === undefined ? 'con-item unlimited current' : 'con-item unlimited'">
                <a style="cursor: pointer" @click="gotoByClassName(undefined)" target="_self">不限</a>
              </div>
              <div :class="index === classnameindex ? 'con-item current' : 'con-item'" v-for="(item, index) of classnameList" :key="index">
                <a style="cursor: pointer" target="_self" v-for="(value,key) of item" :key="key" v-text="key" @click="gotoByClassName(value)"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-brand" style="height: auto;">
        <div class="prop-name">品牌：</div>
        <div class="prop-values">
          <div class="filter-option filter-tab">
            <div class="tab-content" style="display: block;">
              <div :class="make === undefined ? 'con-item unlimited current' : 'con-item unlimited'">
                <a @click="gotoByMake(undefined)" target="_self">不限</a>
              </div>
              <div v-for="(make,index) of makeList" :key="index" :class="index === makeindex ? 'con-item current' : 'con-item'" >
                <a style="cursor: pointer" target="_self" @click="gotoByMake(make)"  v-text="make"></a>
              </div>
            </div>
          </div>
        </div>
        <div style=" clear:both; "></div>
      </div>
      <div class="filter-brand">
        <div class="prop-name">价格区间：</div>
        <div class="prop-values">
          <div class="filter-option filter-tab">
            <div class="tab-content" style="display: block;">
              <div :class="maxinput === null && mininput === null ? 'con-item unlimited current' : 'con-item unlimited'">
                <a style="cursor: pointer" @click="gotoByPrice(false)" target="_self">不限</a>
              </div>
              <div class="con-item"  rel="ag">
                <input class="priceinput" placeholder="¥" type="number"  v-model="mininput"/>
                <span class="pricespan">--</span>
                <input placeholder="¥" class="priceinput" type="number"  v-model="maxinput"/>
                <button class="pricebutton" @click="gotoByPrice(true)">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sort-box">
    <div class="sort">
      <a :style="sort === 'id'?'background: #4595e6;color: white;cursor: default;':'cursor: pointer'" @click="gotoBySort('id')" target="_self" title="综合排序">综合排序</a>
    </div>
    <div class="sort">
      <a :style="sort === 'price_desc'?'background: #4595e6;color: white;cursor: default;':'cursor: pointer'" @click="gotoBySort('price_desc')" target="_self" title="按价格从高到低">按价格从高到低</a>
    </div>
    <div class="sort">
      <a :style="sort === 'price_asc'?'background: #4595e6;color: white;cursor: default;':'cursor: pointer'" @click="gotoBySort('price_asc')" target="_self" title="按价格从低到高">按价格从低到高</a>
    </div>
  </div>
  <div class="item-list">
    <div class="hd"></div>
    <div class="bd">
      <ul v-for="(item,i) in itemList" :key="i">
        <li class="itemli">
          <router-link :to="'/item/'+item.id" target="_blank" :title="item.name+'---'+item.profile">
            <div class="itembox">
              <img :src="JSON.parse(item.imglist)[0]"/>
              <h5 v-text="item.name"></h5>
              <p v-text="item.profile"></p>
              <p style="color:#ff6700; font-size: 16px" v-text="item.price+'元'"></p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="pager">
      <span id="page_prve" :class="nowpage === 1 ? 'pager-null' : 'pager-default'" @click="Number(nowpage) === 1 ? null : gotoByPage(Number(nowpage)-1)">上一页</span>
      <span v-for="i in pagecount>3?3:pagecount" :key="i" :class="nowpage === Number(middlepage)+i-2 ? 'pager-current' : 'pager-default'" @click="nowpage === Number(middlepage)+i-2 ? null : gotoByPage(Number(middlepage)+i-2)" v-text="Number(middlepage)+i-2"></span>
      <span id="page_next" :class="nowpage === pagecount ? 'pager-null' : 'pager-default'" @click="Number(nowpage) === pagecount ? null : gotoByPage( Number(nowpage)+1)">下一页</span>
    </div>
  </div>
  <hr/>
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
  name: 'mall',
  data: function () {
    return {
      isLogin: false,
      username: '',
      searchword: '',
      classnameList: [],
      classname: '',
      make: '',
      maxinput: null,
      mininput: null,
      makeList: [],
      classnameindex: '',
      makeindex: '',
      itemList: [],
      pagecount: null,
      nowpage: null,
      middlepage: null,
      sort: null
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
    gotoByClassName: function (classname) {
      this.$router.push({path: '/mall', query: {'classname': classname}})
    },
    gotoByMake: function (make) {
      this.$router.push({path: '/mall', query: {'classname': this.$route.query.classname, 'make': make}})
    },
    gotoByPrice: function (flag) {
      if (flag === false) this.$router.push({path: '/mall', query: {'classname': this.$route.query.classname, 'make': this.$route.query.make}})
      else {
        if (this.maxinput < 0 || this.maxinput === null || this.maxinput === '') this.maxinput = 0
        if (this.mininput < 0 || this.mininput === null || this.mininput === '') this.mininput = 0
        if (this.mininput <= this.maxinput) {
          this.$router.push({path: '/mall',
            query: {'classname': this.$route.query.classname,
              'make': this.$route.query.make,
              'max': this.maxinput,
              'min': this.mininput}})
        }
      }
    },
    gotoBySort: function (sort) {
      this.$router.push({path: '/mall',
        query: {'classname': this.$route.query.classname,
          'make': this.$route.query.make,
          'max': this.maxinput,
          'min': this.mininput,
          'nowpage': this.nowpage,
          'sort': sort}})
    },
    getItem: function () {
      var Tclassname = 'null'
      var Tmake = 'null'
      var Tmin = 'null'
      var Tmax = 'null'
      var Tsort = 'id'
      if (this.$route.query.classname !== undefined) Tclassname = this.$route.query.classname
      if (this.$route.query.make !== undefined) Tmake = this.$route.query.make
      if (this.$route.query.min !== undefined) Tmin = this.$route.query.min
      if (this.$route.query.max !== undefined) Tmax = this.$route.query.max
      if (this.$route.query.sort !== undefined) Tsort = this.$route.query.sort
      this.$axios.get('/item/getItemList/' + Tclassname + '/' + Tmake + '/' + Tmin + '/' + Tmax + '/' + this.nowpage + '/' + Tsort)
        .then(successResponse => {
          this.itemList = successResponse.data.itemlist
          this.pagecount = successResponse.data.pagecount
          if (Number(this.pagecount) === 1) this.middlepage = 1
          else if (Number(this.pagecount) === Number(this.nowpage)) this.middlepage = this.pagecount - 1
          else if (Number(this.nowpage) === 1) this.middlepage = Number(this.nowpage) + 1
          else this.middlepage = this.nowpage
        })
        .catch(failResponse => {
        })
    },
    gotoByPage: function (pagecount) {
      this.$router.push({path: '/mall',
        query: {'classname': this.$route.query.classname,
          'make': this.$route.query.make,
          'max': this.maxinput,
          'min': this.mininput,
          'nowpage': pagecount}})
    },
    logout: function () {
      this.$axios.get('/user/logout')
        .then(successResponse => {
          window.location.reload()
        })
        .catch(failResponse => {
        })
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
    this.classname = this.$route.query.classname
    this.make = this.$route.query.make
    if (this.$route.query.min !== undefined) this.mininput = this.$route.query.min
    if (this.$route.query.max !== undefined) this.maxinput = this.$route.query.max
    if (this.$route.query.nowpage !== undefined) this.nowpage = this.$route.query.nowpage
    else this.nowpage = 1
    if (this.$route.query.sort !== undefined) this.sort = this.$route.query.sort
    else this.sort = 'id'
    this.$axios.get('/item/getClassnameList/')
      .then(successResponse => {
        this.classnameList = successResponse.data
        for (var i = 0; i < this.classnameList.length; i++) {
          for (var value in this.classnameList[i]) { if (this.classnameList[i][value] === this.classname) this.classnameindex = i }
        }
      })
      .catch(failResponse => {
      })
    if (this.classname !== undefined) {
      this.$axios.get('/item/getMakeList/' + this.classname)
        .then(successResponse => {
          this.makeList = successResponse.data.makelist
          for (var i = 0; i < this.makeList.length; i++) {
            if (this.makeList[i] === this.make) this.makeindex = i
          }
        })
        .catch(failResponse => {
        })
    }
    this.getItem()
  }

}
</script>

<style>
  @import "../assets/icon/iconfont.css";
  @import "../assets/css/common.css";
  @import "../assets/css/mall.css";
</style>
