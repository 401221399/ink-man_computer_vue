
<template>
  <body style="background-color: white; height: 100%;width: 100%;position: fixed;margin: 0;padding: 0">
  <div style="width: 100%;height: 88px;margin: 0 auto;">
    <div class="logo" style="margin-top: 0px;">
      <router-link to='index'  style="display: block;width: 100%;height: 100%;"></router-link>
    </div>
  </div>
  <div id="middle">
    <form id="loginForm">
      <div id="register">密码登录</div>
      <div id="username_div">
        <span id="row1"></span>
        <input type="text" v-model="loginForm.username" name="username" id="username" placeholder="用户名/手机号/邮箱"/>
      </div>
      <p class="tips">
      </p>
      <div id="password_div">
        <span id="row2"></span>
        <input type="password" v-model="loginForm.password" name="password" id="password" placeholder="密码"/>
      </div>
      <p class="tips">
      </p>

      <el-button type="primary" id="loginButton" v-on:click="login">登陆</el-button>
      <div class="margin">
        <span class="a"> <router-link to='register' title="免费注册" target="_blank">免费注册</router-link></span>
        <span class="a"><a href="" title="忘记密码?">找回密码</a></span>
      </div>
      <hr/>
      <div class="margin">
        <div>第三方平台快速登录</div>
        <a href="" title="可用QQ帐号登录"><img src="../assets/img/QQ.png" alt="QQ"/></a>
        <a href="" title="可用微信帐号登录"><img src="../assets/img/WeChat.png" alt="微信"/></a>
        <a href="" title="可用微博帐号登录"><img src="../assets/img/micro-blog.png" alt="微博"/></a>
      </div>
    </form>

  </div>

  <div style="width: 100%;margin: 0 auto;">
    <span style="color: black;position: relative;left: 35%">
      Copyright &copy; 2019.Company name All rights reserved. <router-link to='index' target="_blank" >清风明月-电脑商城</router-link>
    </span>
  </div>

  <hr size="2" color="#E6E6E6"/>
  </body>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    // 设置cookie
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      console.info(cname + '=' + cvalue + '; ' + expires)
      document.cookie = cname + '=' + cvalue + '; ' + expires
      console.info(document.cookie)
    },
    login () {
      this.$axios
        .post('user/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.$router.replace({path: '/'})
            this.setCookie('username', this.loginForm.username, 365)
          } else {
            this.$swal({
              type: 'error',
              title: '错误',
              text: successResponse.data.msg,
              showCloseButton: true,
              showCancelButton: false
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}

</script>

<style scoped>
  @import "../assets/css/bs.css";
  @import "../assets/css/login.css";

</style>
