<template>
  <body>
    <iframe scrolling="yes" frameborder="0" :style="'width: 100%;height:' +windowheight+ ';'" src="../../static/xadmin/html/index.html"></iframe>
  </body>
</template>

<script>
export default {
  name: 'userInfo',
  data: function () {
    return {
      windowheight: null
    }
  },
  methods: {},
  mounted: function () {
    this.windowheight = window.innerHeight + 'px'
  }
}
</script>

<style scoped>

</style>
