<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  mounted() {
    this.$nextTick(() => {
    });
  }
}
</script>

<style>
@import "./assets/css/reset.css";
#app{
  width:100%;
  min-height:100%;
}
</style>
