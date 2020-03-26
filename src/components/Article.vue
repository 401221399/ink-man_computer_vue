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
    <router-link to="" class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-account"></i></div>
      <span class="toolbar-text">个人中心</span>
    </router-link>
    <router-link to="/shopcar" class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-cart"></i></div>
      <span class="toolbar-text">购物车</span>
    </router-link>
    <div class="toolbar-item" @mouseenter="showpkbox(true)" @mouseleave="showpkbox(false)">
      <div class="toolbar-ico"><i class="iconfont icon-icon_pk"></i></div>
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
    <router-link to="" class="toolbar-item">
      <div class="toolbar-ico"><i class="iconfont icon-service"></i></div>
      <span class="toolbar-text">人工服务</span>
    </router-link>
  </div>
  <div class="main">
    <div class="articlebox">
      <div class="left-box">
        <div class="select-tar">
          <span class="name">各大版块:</span>
          <ul class="classnameList">
            <li v-for="(item,i) in classnameList" :key="i" >
              <a style="cursor: pointer" target="_self" v-for="(value,key) of item" :key="key" v-text="key" @click="gotoByClassName(value)"></a>
            </li>
          </ul>
        </div>
        <ul class="article-list">
          <li class="article-item" v-for="(item,i) in articlelist" :key="i">
            <a :href="item.url" target="_blank" class="ariticle-title" v-text="item.title"></a>
            <span style="color:#667ebd" v-text="item.pc"></span>
            <a :href="item.url" :title="item.title" target="_blank"><img class="article-img"  :src="item.imgurl ==='https://www.pconline.com.cn/blank.gif' ? 'https://2c.zol-img.com.cn/article/15_160x120/896/liv1vMToKBHE.jpg':item.imgurl" width="600px" height="300px"/> </a>
            <p class="article-profile">
              <span style="display: block;" v-text="item.profile"></span>
              <span style="color: #999" v-text="item.form"></span> &nbsp;|&nbsp;<span style="color: #999" v-text="item.data"></span>
              <a :href="item.url"  target="_blank">全文》</a>
            </p>
          </li>
        </ul>
      </div>
      <div class="right-box">
        <div class="new-article-box">
          <h4>
            <strong class="tab">
              <span>最新的评测文章</span>
            </strong>
          </h4>
          <ul class="new-article-list">
            <li v-for="(item,i) in newarticlelist" :key="i" class="new-article-item">
              <a :href="item.url" target="_blank" :title="item.pc" v-text="item.title"></a>
            </li>
          </ul>
        </div>
      </div>
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
  name: 'Article',
  data: function () {
    return {
      searchword: '',
      PKList: [],
      pkboxshow: false,
      articlelist: [],
      newarticlelist: [],
      pagecount: 1,
      nowpage: 1,
      classnameList: null,
      classname: null
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
    // 设置cookie
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      console.info(cname + '=' + cvalue + '; ' + expires)
      document.cookie = cname + '=' + cvalue + '; ' + expires
      console.info(document.cookie)
    },
    // 获取cookie
    getCookie: function (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      // console.log('获取cookie,现在循环')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        // console.log(c)
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) {
          return c.substring(name.length, c.length)
        }
      }
      return undefined
    },
    addPK: function (id) {
      var cookies = this.getCookie('PKList')
      if (cookies === undefined) var pklist = []
      else pklist = JSON.parse(this.getCookie('PKList'))
      if (pklist.indexOf(id) > -1) {
        this.$swal({
          title: '提示',
          type: 'error',
          text: '已在PK栏',
          showCloseButton: true,
          showCancelButton: false
        })
        return
      }
      if (pklist.length >= 3) {
        this.$swal({
          title: '提示',
          type: 'error',
          text: 'PK栏最多存放3个商品，请移除之前的商品',
          showCloseButton: true,
          showCancelButton: false
        })
        return
      }
      pklist.push(id)
      var PKList = JSON.stringify(pklist)
      this.setCookie('PKList', PKList, 365)
      this.$swal({
        type: 'success',
        title: '提示',
        text: '加入PK栏成功',
        showCloseButton: true,
        showCancelButton: false
      }).then((value) => {
        window.location.reload()
      })
    },
    getPKList: function () {
      if (this.getCookie('PKList') === undefined) return
      var PKList = JSON.parse(this.getCookie('PKList'))
      var parameterSet = new Set()
      for (var i in PKList) {
        this.$axios.get('/item/getItemByid/' + PKList[i])
          .then(successResponse => {
            this.PKList.push(successResponse.data.item)
            var parameter = JSON.parse(successResponse.data.item.parameter)
            for (var i in parameter) {
              for (var classname in parameter[i]) {
                for (var name in parameter[i][classname][0]) {
                  parameterSet.add(name)
                }
              }
            }
            this.parameterList = Array.from(parameterSet)
          })
          .catch(failResponse => {
          })
      }
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
    showpkbox: function (pkboxshow) {
      this.pkboxshow = pkboxshow
      this.getParameter(this.PKList[0].parameter, '型号别称')
    },
    getArticle: function () {
      var Tclassname = 'null'
      var Tform = 'null'
      var Tsort = 'id'
      if (this.$route.query.classname !== undefined) Tclassname = this.$route.query.classname
      if (this.$route.query.form !== undefined) Tform = this.$route.query.form
      if (this.$route.query.sort !== undefined) Tsort = this.$route.query.sort
      this.$axios.get('/article/getArticleList/' + Tclassname + '/' + Tform + '/' + this.nowpage + '/' + Tsort)
        .then(successResponse => {
          this.articlelist = successResponse.data.articlelist
          this.pagecount = successResponse.data.pagecount
          if (Number(this.pagecount) === 1) this.middlepage = 1
          else if (Number(this.pagecount) === Number(this.nowpage)) this.middlepage = this.pagecount - 1
          else if (Number(this.nowpage) === 1) this.middlepage = Number(this.nowpage) + 1
          else this.middlepage = this.nowpage
        })
        .catch(failResponse => {
        })
    },
    getnewArticle: function () {
      var Tclassname = 'null'
      var Tform = 'null'
      var Tsort = 'data_desc'
      if (this.$route.query.classname !== undefined) Tclassname = this.$route.query.classname
      if (this.$route.query.form !== undefined) Tform = this.$route.query.form
      this.$axios.get('/article/getArticleList/' + Tclassname + '/' + Tform + '/' + 1 + '/' + Tsort)
        .then(successResponse => {
          this.newarticlelist = successResponse.data.articlelist
        })
        .catch(failResponse => {
        })
    },
    getClassnameList: function () {
      this.$axios.get('/item/getClassnameList/')
        .then(successResponse => {
          this.classnameList = successResponse.data
        })
        .catch(failResponse => {
        })
    },
    gotoByClassName: function (classname) {
      this.$router.push({path: '/Article', query: {'classname': classname}})
    }
  },
  mounted: function () {
    if (this.$route.query.classname !== undefined) this.classname = this.$route.query.classname
    this.getPKList()
    this.getArticle()
    this.getnewArticle()
    this.getClassnameList()
  }
}
</script>

<style>
  @import "../assets/css/common.css";
  @import "../assets/css/article.css";
  @import "../assets/icon/iconfont.css";
</style>
