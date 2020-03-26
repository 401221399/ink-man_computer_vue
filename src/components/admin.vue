<template>
  <body>
    <iframe id="admin" scrolling="yes" frameborder="0" :style="'width: 100%;height:' +windowheight+ ';'" src="../../static/xadmin/html/admin.html"></iframe>
    <iframe id="adminhome" style="display: none" scrolling="yes" frameborder="0" :style="'width: 100%;height:' +windowheight+ ';'" src="../../static/xadmin/html/adminhome.html"></iframe>
  </body>
</template>

<script>
export default {
  name: 'admin',
  data: function () {
    return {
      show: false,
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
