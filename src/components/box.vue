<template>
  <div class='kz-cont' v-show='showstate'>
    <div class='kz-wrapper' >
      <div class='kz-title'>
        <strong><slot name='title' ></slot></strong>
      </div>
      <div class='kz-text'>
        <strong><slot name='text' ></slot></strong>
      </div>
      <div class='footer'>
        <div @click='tocancel' class='kz-btn'>驳回</div>
        <div class='kz-btn' @click='took'>同意</div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'eject',
  props: ['type', 'showstate'],
  methods: {
    tocancel: function () {
      this.$emit('tocancel')
    },
    took: function () {
      this.$emit('took')
    }
  }
}
</script>

<style>
  .kz-cont{position:fixed;left:0;right: 0;top:0;bottom: 0;z-index: 500;background:rgba(0,0,0,0.3);text-align:center;overflow: hidden;white-space:nowrap;}
  .kz-cont:after{content:"";display:inline-block;width:0;height:100%;visibility: hidden;vertical-align:middle;}
  .kz-wrapper{display:inline-block;vertical-align:middle;background:#fff;color:#333333;border-radius: 5px;max-width:100%;}
  .kz-title{text-align:center;padding:10px 24px;}
  .footer{display:flex;border-top:1px solid #E5E5E5;color:#488BF1;}
  .kz-btn{flex:1;padding: 12px;}
  .kz-btn +.kz-btn{border-left:1px solid #E5E5E5;}
</style>
