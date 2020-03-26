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
    <div v-show="word" class="site-header ">
      <div class="container">
        <div class="logo" style="left: 0px;">
          <router-link to='index'  style="display: block;width: 100%;height: 100%;"></router-link>
        </div>
        <div class="header-search " style="float: left;">
          <div id="J_searchForm" style="width: 532px" class="search-form clearfix"><label for="search" class="hide">站内搜索</label>
            <input  type="search" style="width: 480px" id="search" name="keyword" autocomplete="off" class="search-text" :value="word" @input="inputchange"/>
            <i class="iconfont icon-search search-btn" @click="search()" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="word === null" style="width: 100%">
    <div class="logo" style="float: none;margin: 90px auto 0px auto;width: 300px; height: 147px">
      <router-link to='index'  style="display: block;width: 100%;height: 100%;"></router-link>
    </div>
    <div class="header-search ">
      <div style="width: 532px;margin: 0 auto;" class="search-form clearfix"><label for="search" class="hide">站内搜索</label>
        <input  type="search" style="width: 480px;"  name="keyword" autocomplete="off" class="search-text" :value="word" @input="inputchange"/>
        <i class="iconfont icon-search search-btn" @click="search()" ></i>
      </div>
    </div>
  </div>
  <div v-show="word" class="pagetool">
    <router-link class="page_last" :to="'/search/'+word+'?page=' + lastpage + '&limit=10'"  target="_self"><i class="layui-icon layui-icon-left"></i></router-link>
    <span class="page_curr" v-text="page"></span>
    <router-link class="page_next" :to="'/search/'+ word + '?page=' +nextpage + '&limit=10'"  target="_self"><i class="layui-icon layui-icon-right"></i></router-link>
    <span>到第<input type="text" min="1" v-model="skippage"  class="page_input">页<button type="button" @click="skip_page()" class="page_btn">确定</button></span>
    <span>共 <span v-text="pagecount"></span> 页</span>
  </div>
  <div v-show="word" class="search_results">
    <div id="item_result_box" class="result_box">
      <div class="sttl mbn">
        <h2 :value="pagecount">结果: 找到"<span v-text="word"></span>"相关商品  <span v-text="itemcount"></span> 件</h2>
      </div>
      <ul v-for="item of itemList" :key="item.id">
        <li>
          <h3 class="title">
            <router-link :to="'/item/'+item.id"  target="_self" v-html="item.name"></router-link>
          </h3>
          <p class="xg1">价格：<span v-html="item.price"></span>￥   -分类:<span v-text="item.classname"></span></p>
          <p v-html="item.profile"></p>
        </li>
      </ul>
    </div>
    <div id="article_result_box" style="margin-left: 30px" class="result_box">
      <div class="sttl mbn">
        <h2>结果: 找到"<span v-text="word"></span>"相关评测文章  <span v-text="articlecount"></span> 篇</h2>
      </div>
      <ul v-for="article of articleList" :key="article.id">
        <li>
          <h3 class="title">
            <router-link :to="article.url"  target="_self" v-html="article.title"></router-link>
          </h3>
          <p class="xg1">评测硬件：<span v-html="article.pc"></span>   -分类:<span v-text="article.classname"></span></p>
          <p v-html="article.profile"></p>
          <p>
            <span v-html="article.data"></span>
            <span v-html="article.form"></span>
          </p>
        </li>
      </ul>
    </div>
  </div>
  </body>
</template>

<script>
export default {
  name: 'search',
  data: function () {
    return {
      page: 0,
      pagecount: 0,
      limit: 10,
      word: '',
      itemList: [],
      articleList: [],
      itemcount: 0,
      articlecount: 0,
      lastpage: '',
      nextpage: '',
      skippage: '',
      searchword: ''
    }
  },
  methods: {
    skip_page: function () {
      window.location.href = 'http://localhost:8090/#/search/' + this.word + '?page=' + this.skippage + '&limit=10'
    },
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
    }
  },
  mounted: function () {
    if (this.$route.params.word === 'index') this.word = null
    else {
      this.word = this.$route.params.word
      this.page = this.$route.query.page
      this.skippage = this.$route.query.page
      this.lastpage = parseInt(this.page) - 1 > 0 ? parseInt(this.page) - 1 : 1
      this.$axios.get('/item/searchItem/' + this.word + '?page=' + this.page + '&limit=10')
        .then(res => {
          var alist = res.data.itemlist
          this.itemcount = res.data.count
          var pagecount = parseInt(this.itemcount / 10) - 1
          this.pagecount = pagecount > this.pagecount ? pagecount : this.pagecount
          this.nextpage = parseInt(this.page) + 1 > this.pagecount ? this.pagecount : parseInt(this.page) + 1
          for (var i = 0; i < alist.length; i++) {
            var str = String(alist[i].name).split(this.word)
            var name = ''
            for (var j = 0; j < str.length; j++) {
              if (j !== str.length - 1) name = name + str[j] + '<strong><font color="#ff0000">' + this.word + '</font></strong>'
              else name = name + str[j]
            }
            alist[i].name = name === '' ? alist[i].name : name

            str = String(alist[i].profile).split(this.word)
            var profile = ''
            for (var k = 0; k < str.length; k++) {
              if (k !== str.length - 1) profile = profile + str[k] + '<strong><font color="#ff0000">' + this.word + '</font></strong>'
              else profile = profile + str[k]
            }
            alist[i].profile = profile === '' ? alist[i].profile : profile

            str = String(alist[i].price).split(this.word)
            var price = ''
            for (var l = 0; l < str.length; l++) {
              if (l !== str.length - 1) price = price + str[l] + '<strong><font color="#ff0000">' + this.word + '</font></strong>'
              else price = price + str[l]
            }
            alist[i].price = price === '' ? alist[i].price : price
          }
          this.itemList = alist
        })
        .catch(failResponse => {
        })
      this.$axios.get('/article/searchArticle/' + this.word + '?page=' + this.page + '&limit=10')
        .then(res => {
          var alist = res.data.articlelist
          this.articlecount = res.data.count
          var pagecount = parseInt(this.articlecount / 10) - 1
          this.pagecount = pagecount > this.pagecount ? pagecount : this.pagecount
          this.nextpage = parseInt(this.page) + 1 > this.pagecount ? this.pagecount : parseInt(this.page) + 1
          for (var i = 0; i < alist.length; i++) {
            var str = String(alist[i].title).split(this.word)
            var title = ''
            for (var j = 0; j < str.length; j++) {
              if (j !== str.length - 1) title = title + str[j] + '<strong><font color="#ff0000">' + this.word + '</font></strong>'
              else title = title + str[j]
            }
            alist[i].title = title === '' ? alist[i].title : title

            str = String(alist[i].profile).split(this.word)
            var profile = ''
            for (var k = 0; k < str.length; k++) {
              if (k !== str.length - 1) profile = profile + str[k] + '<strong><font color="#ff0000">' + this.word + '</font></strong>'
              else profile = profile + str[k]
            }
            alist[i].profile = profile === '' ? alist[i].profile : profile

            str = String(alist[i].pc).split(this.word)
            var pc = ''
            for (var l = 0; l < str.length; l++) {
              if (l !== str.length - 1) pc = pc + str[l] + '<strong><font color="#ff0000">' + this.word + '</font></strong>'
              else pc = pc + str[l]
            }
            alist[i].pc = pc === '' ? alist[i].pc : pc
          }
          this.articleList = alist
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style>
  @import "../assets/icon/iconfont.css";
  @import "../assets/css/common.css";
  @import "../assets/css/search.css";
</style>
