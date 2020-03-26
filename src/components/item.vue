<template>
<body>
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
        <span style="color: #b0b0b0;" id="shopcar_num" v-text="'('+ShopCarNum+')'"></span>
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
<!--商品信息-->
  <div id="a" class="Xcontent">
    <ul class="Xcontent01">
      <div class="Xcontent06"><img style="width: 100%;height: 100%;" :src="showImgurl"></div>
      <ol class="Xcontent13">
        <div class="Xcontent14"><a><p style="width: 502px;" v-text="itemname">新物品</p></a></div>
        <div class="Xcontent17">
          <p class="Xcontent18">售价</p>
          <p class="Xcontent19">￥<span v-text="itemprice">69.00</span></p>
          <div class="Xcontent20">
            <p class="Xcontent21">简述</p>
            <span class="Xcontent22" style="width: 415px; color: black;" v-text="itemprofile"></span>
          </div>
          <div class="Xcontent23">
            <p class="Xcontent24">服务</p>
            <p class="Xcontent25">30天无忧退货&nbsp;&nbsp;&nbsp;&nbsp; 48小时快速退款 &nbsp;&nbsp;&nbsp;&nbsp; 满88元免邮</p>
          </div>

        </div>
        <div class="Xcontent26" style="height: 80px;">
          <p class="Xcontent27">颜色</p>
          <div class="Xcontent28" :title="itemname" value="0" @click="changeImg(imgurl[0].replace('_sn8',''))"><img :src="imgurl[0]"></div>
        </div>

        <div class="divcontent" v-html="divcontent">

        </div>

        <div class="Xcontent30">
          <p class="Xcontent31">数量</p>
          <div class="Xcontent32" @click="changenum(-1)"><img src="../assets/img/X15.png"></div>
          <form><input class="input" name="num" :value="itemnum"></form>
          <div class="Xcontent33" @click="changenum(1)"><img src="../assets/img/X16.png"></div>
        </div>
        <div class="Xcontent34" style="cursor:pointer;"><img src="../assets/img/X17.png"></div>
        <div class="Xcontent35"><a @click="addshopcar()" style="cursor: pointer"><img src="../assets/img/X18.png"></a></div>
        <div class="Xcontent35"><a @click="addPK(itemid)" style="cursor: pointer"><img style="border: 1px solid #5a5a5a;" src="../assets/img/pk.png"></a></div>
      </ol>
      <ol class="Xcontent08">
        <div class="Xcontent07" @mouseenter="changeImg(imgurl[0].replace('_sn8',''))"><img :src="imgurl[0]"></div>
        <div class="Xcontent09" @mouseenter="changeImg(imgurl[1].replace('_sn8',''))"><img :src="imgurl[1]"></div>
        <div class="Xcontent10" @mouseenter="changeImg(imgurl[2].replace('_sn8',''))"><img :src="imgurl[2]"></div>
        <div class="Xcontent11" @mouseenter="changeImg(imgurl[3].replace('_sn8',''))"><img :src="imgurl[3]"></div>
      </ol>
    </ul>
  </div>
<!--评测-->
  <div class="article">
    <div class="b-th">
      <h3 class="mark">
        <span v-text="itemname"></span><span>&nbsp;评测文章</span>
      </h3>
    </div>
    <div class="b-tb">
      <ul class="m-pingce" v-for="item of articleList" :key="item.id">
        <li>
          <a :href="item.url" class="blk-img"  title="" _hover-ignore="1">
            <img :src="item.imgurl==='https://www.pconline.com.cn/blank.gif'?'https://2c.zol-img.com.cn/article/15_160x120/896/liv1vMToKBHE.jpg':item.imgurl" width="345" height="190" :alt="item.pc">
            <dl>
              <dt v-text="item.title"></dt>
              <dd class="u-summary" _hover-ignore="1" v-text="item.profile"></dd>
              <dd class="artInfo">
                <span class="time"><ins></ins><span v-text="item.data"></span></span>
                <span class="cmt"><ins></ins><span v-text="item.form"></span></span>
              </dd>
            </dl>
          </a>
        </li>
      </ul>
    </div>
  </div>
<!--参数-->
  <div class="params">
    <div class="b-th">
      <h3 class="mark">
        <span v-text="itemname"></span><span>&nbsp;参数详情</span>
      </h3>
    </div>
    <div class="bd" >
      <table cellpadding="0" cellspacing="0" class="dtparams-table" v-for="(classname,index) of classnameList" :key="index">
        <thead>
          <tr>
            <!--类名-->
            <th v-text="classname" style="font-size: 16px">基础参数</th>
            <!--空-->
            <td></td>
          </tr>
        </thead>
        <tbody>
          <!--多个tr，类型下面的多个属性行-->
          <tr class="paramclass" v-for="(item , i) of paramsJson[index][classname][0]" :key="i">
            <!--key-->
            <th v-text="i">上市时间</th>
            <!--value-->
            <td v-text="item">2016年</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<hr/>
  <div class="left-side" id="Jleftside" style="display: block; position: fixed; top: 250px;">
    <p class="line-wrap">
      <i class="line"></i>
    </p>
    <ul class="links">
      <li class="">
        <a @click="gotoclass('.Xcontent')" target="_self"><i></i>商品展示</a>
      </li>
      <li class="">
        <a target="_self" @click="gotoclass('.article')"><i></i>评测文章</a>
      </li>
      <li class="">
        <a target="_self" @click="gotoclass('.params')"><i></i>参数详情</a>
      </li>
    </ul>
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
  name: 'item',
  data: function () {
    return {
      searchword: '',
      itemname: '',
      itemprice: '',
      imgurl: [],
      itemid: '',
      itemprofile: '',
      showImgurl: '',
      itemnum: 1,
      divcontent: '',
      articleList: '',
      paramsJson: '',
      classnameList: [],
      PKList: [],
      pkboxshow: false,
      ShopCarList: [],
      ShopCarNum: 0,
      ShopCarboxshow: false
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
    changeImg: function (url) {
      this.showImgurl = url
    },
    changenum (flag) {
      this.itemnum = this.itemnum + flag
      if (this.itemnum < 0) { this.itemnum = 0 }
    },
    gotoclass: function (classname) {
      document.querySelector(classname).scrollIntoView(true)
    },
    // 设置cookie
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + '; ' + expires
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
    },
    addshopcar: function () {
      this.$axios.post('/item_options/save_Shopcar_Collection/',
        {itemid: parseInt(this.$route.params.id), type: 'shopcar', count: parseInt(this.itemnum)})
        .then(res => {
          if (res.data.code === 0) {
            this.getShopCarList()
            this.$swal({
              type: 'success',
              title: '提示',
              text: '已加入购物车',
              showCloseButton: true,
              showCancelButton: false
            })
          } else {
            this.$swal({
              type: 'error',
              title: '提示',
              showCloseButton: true,
              text: '您还未登录，请登录',
              showCancelButton: false
            }).then((value) => {
              this.$router.replace({path: '/login'})
            })
          }
        }).catch(failResponse => {
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
    getShopCarList: function () {
      this.$axios.get('/item_options/getShopcar_CollectionList/shopcar?page=1&size=3')
        .then(successResponse => {
          console.log(successResponse.data)
          this.ShopCarList = successResponse.data.data
          this.ShopCarNum = successResponse.data.count
        })
        .catch(failResponse => {
        })
    }
  },
  mounted: function () {
    this.getPKList()
    this.getShopCarList()
  },
  beforeCreate: function () {
    var id = this.$route.params.id
    this.$axios.get('/item/getItemByid/' + id)
      .then(successResponse => {
        this.itemname = successResponse.data.item.name
        this.itemprice = successResponse.data.item.price
        this.imgurl = JSON.parse(successResponse.data.item.imglist)
        this.showImgurl = this.imgurl[0].replace('_sn8', '')
        this.divcontent = successResponse.data.item.divbox
        this.itemprofile = successResponse.data.item.profile
        this.paramsJson = JSON.parse(successResponse.data.item.parameter)
        this.itemid = id
        for (var i in this.paramsJson) {
          for (var key in this.paramsJson[i]) {
            if (key === '') continue
            this.classnameList.push(key)
          }
        }
      })
      .catch(failResponse => {
      })
    this.$axios.get('/Article/getArticleByItemId/' + id)
      .then(successResponse => {
        this.articleList = successResponse.data.articleList
      })
      .catch(failResponse => {
      })
  }
}
</script>

<style>
  @import "../assets/css/common.css";
  @import "../assets/css/item.css";
  @import "../assets/icon/iconfont.css";
  body{
    margin:0; padding:0;
    font-size: 12px;
    border: none;
  }
  .divcontent{
    width: 500px;
    height: auto;
  }
  .baseParam {
    padding-top: 8px;
  }
  .baseParam dt {
    color: #999;
  }
  .baseParam i {
    width: 50%;
    float: left;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
  }
  .baseParam .u-longTxt {
    text-indent: 12px;
  }
  .chart-box {
    border: 1px solid #f0f0f0;
    border-top: 0;
    position: relative;
  }
  .chart-tb {
    position: absolute;
    bottom: -24px;
    left: 0;
    width: 100%;
  }
  .chart-tb .table{
    width: 100%;
  }
  .chart-tb .table, .chart-tb .table tr, .chart-tb .table td {
    border-collapse: collapse;
    font-size: 12px;
    line-height: 24px;
  }
  .chart-box p.c-hline {
    height: 16px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 16px;
    border-top: 1px solid #f0f0f0;
  }
  table tr, table td {
    border-collapse: collapse;
  }
  .histogram {
    height: 85px;
    width: 16px;
    margin: 0 auto;
    position: relative;
  }
  .histogram p {
    height: 0;
    width: 16px;
    background: url(../assets/img/icons.png) 0 0 no-repeat;
    background-position: -158px 0;
    position: absolute;
    bottom: 0;
    left: 0;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .histogram p em {
    width: 100%;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    position: absolute;
    top: -16px;
    left: 0;
    text-align: center;
    font-weight: bold;
    color: #333;
  }
  .chart-tb .table .h-addr {
    width: 90%;
    height: 24px;
    padding: 0 5%;
    line-height: 24px;
    overflow: hidden;
    text-align: center;
    color: #333;
  }
  .chart-tb .table .h-addr {
    width: 90%;
    height: 24px;
    padding: 0 5%;
    line-height: 24px;
    overflow: hidden;
    text-align: center;
    color: #333;
  }
</style>
