<template>
  <div class='zk-box'>
    <div class='zk-flex zk-pd'>
      <div class='zk-btn' @click='alerts'>意见框</div>
      <Eject  type='alert' @took='okfall' @tocancel='cancelfall' :showstate='showa'>
        <div slot='title'>审批意见</div>
        <span slot='tlt'>提示</span>
        <textarea slot='text'  v-model="textcontent" placeholder="请输入审批意见" style="width:200px; height: 100px; resize: none"></textarea>
      </Eject>
    </div>
  </div>
</template>

<script>
import Eject from './box'
export default{
  name: 'demo',
  components: {
    Eject
  },
  data () {
    return {
      showa: false,
      showc: false,
      msg: '',
      textcontent: ''
    }
  },
  methods: {
    alerts () {
      this.showa = true
    },
    okfall () {
      this.showa = false
      console.log('同意' + this.textcontent)
    },
    cancelfall () {
      this.showa = false
      console.log('驳回')
    }
  }
}
</script>

<style>
  .zk-box{display:flex;line-height:0.65rem;font-size:0.26rem;color:#333;padding:4.5rem 0;}
  .zk-flex{flex:1;}
  .zk-pd{padding:0.5rem 0.1rem;}
  .zk-btn{display:block;line-height:0.88rem;text-align:Center;color:#fff;border-radius: 0.12rem;background:#488BF1 ;}
  .zk-blue{background:#488BF1;}
</style>
