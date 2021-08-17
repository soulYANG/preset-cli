<template>
  <div class="footer">
    <p>苏州市公安 2020</p>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props:['args'],
  methods:{

  },
  mounted() {
    this.$nextTick(() => {

    });
  }
}
</script>
<style lang="less" scoped>
.footer{
  font-size:16px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  opacity:0.3;
  text-align: center;
  margin:20px auto;
}
</style>