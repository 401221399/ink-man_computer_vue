<template>
  <body style="background-color: #ebeeef; height: 100%;width: 100%;position: fixed;margin: 0;padding: 0">
    <el-form class="login-container" label-position="left" label-width="0px">
      <div class="logo_min" style="margin-left: 42%" ></div>
      <div style="text-align: center">
        <h4 style="margin: 0;font-size: 30px;font-weight: normal;">注册帐号</h4>
      </div>

      <el-form-item>
        <el-input class="el_input"  @blur="inputblur('username')" type="text" v-model="registerForm.username" auto-complete="off" placeholder="账号"></el-input>
        <span class="ok" v-text="username_ok">&nbsp;</span>
      </el-form-item>

      <el-form-item>
        <el-input id="password" class="el_input"  @blur="inputblur('password')" type="password" v-model="registerForm.password" auto-complete="off" placeholder="密码"></el-input>
        <span class="ok" v-text="password_ok">&nbsp;</span>
      </el-form-item>

      <el-form-item>
        <el-input id="repassword" class="el_input"  @blur="inputblur('repassword')" type="password" v-model="registerForm.repassword" auto-complete="off" placeholder="再次输入密码"></el-input>
        <span class="ok" v-text="repassword_ok">&nbsp;</span>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" class="regbutton" v-on:click="register">立即注册</el-button>
      </el-form-item>

      <div style="text-align: center;margin-top: 20px"> <router-link to='login' class="loginbutton" title="登陆">登陆</router-link></div>

      <div style="color: #9d9d9d;text-align: center;margin-top: 20px">
        <label style="padding: 10px 0;cursor: pointer;display: inline-block;font-size: 14px;">
          <!--<i class="icon_select"></i>-->已阅读并同意： <a href="#" title="用户协议">用户协议</a>和<a href="#"  title=" 隐私政策 "> 隐私政策 </a>
        </label>
      </div>
    </el-form>
  </body>
</template>

<script >
var $ = require('jquery')
export default {
  name: 'register',
  data () {
    return {
      username_ok: '',
      password_ok: '',
      repassword_ok: '',
      isHaveUser: '',
      registerForm: {
        username: '',
        password: '',
        repassword: ''
      },
      responseResult: []
    }
  },
  methods: {
    register () {
      if (this.registerForm.password !== this.registerForm.repassword) {
        this.$swal({
          type: 'error',
          title: '错误',
          text: '两次密码不一致',
          showCloseButton: true,
          showCancelButton: false
        })
      } else if (this.isHaveUser) {
        this.$swal({
          type: 'error',
          title: '错误',
          text: '用户已存在',
          showCloseButton: true,
          showCancelButton: false
        })
      } else {
        this.$axios
          .post('user/save', {
            username: this.registerForm.username,
            password: this.registerForm.password
          })
          .then(successResponse => {
            if (successResponse.status === 200) {
              this.$router.replace({path: '/login'})
            }
          })
          .catch(failResponse => {
          })
      }
    },
    // 失去焦点
    inputblur: function (name) {
      if (name === 'username') {
        this.$axios
          .get('user/isHaveUser/' + this.registerForm.username)
          .then(successResponse => {
            if (successResponse.data.code === 0) {
              this.isHaveUser = successResponse.data.msg
              if (successResponse.data.msg === true) {
                this.username_ok = '用户已存在'
                document.getElementsByClassName('ok')[0].style.color = '#ff0000'
              } else {
                this.username_ok = '用户名合法'
                document.getElementsByClassName('ok')[0].style.color = '#47a011'
              }
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
      } else if (name === 'password') {
        if ($('#password').val() === '') {
          this.password_ok = '请输入密码'
          document.getElementsByClassName('ok')[1].style.color = '#ff0000'
        } else {
          this.password_ok = ''
          document.getElementsByClassName('ok')[1].style.color = '#47a011'
        }
      } else if (name === 'repassword') {
        if ($('#repassword').val() !== $('#password').val()) {
          this.repassword_ok = '两次密码不一致'
          document.getElementsByClassName('ok')[2].style.color = '#ff0000'
        } else {
          this.repassword_ok = ''
          document.getElementsByClassName('ok')[2].style.color = '#47a011'
        }
      }
    }
  }

}
</script>

<style >
  .ok{
    padding: 10px;
    margin: 0;
    display: block;
    color: green;
  }
  .login-container {
    text-align: center;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 70px auto;
    width: 60%;
    height: 550px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginbutton
  {
    background: #0073ced4;
    color: white;
    text-decoration:none;
    font-size: 18px;
    padding: 5px 15px 5px 15px;
    border-radius: 3px;
  }
  .el_input .el-input__inner {
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #000;
    font-size: 14px;
    padding: 8px 0 8px 28px;
    width: 380px;
    height: 30px;
  }
  .logo_min{
    position: relative;
    width: 150px;
    height: 150px;
    background-image: url(../assets/img/logo-min.png);
    background-size: 100% 100%;
  }
  .regbutton{
    width: 340px;
    height: 45px;
    color: #fff;
    font-size: 18px;
    letter-spacing: 1px;
    background: #ff6700;
    border: 1px solid #ff6700;
    cursor: pointer;
    border-radius: 3px;
    margin: 20px 20px 0px 20px ;
  }
</style>
