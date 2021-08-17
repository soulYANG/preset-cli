<template>
  <div class="overview default-layout">
    <div class="title">概览</div>
    <div class="wrap">
      <i class="jao left-top"></i>
      <i class="jao left-bom"></i>
      <i class="jao right-top"></i>
      <i class="jao right-bom"></i>
      <ul class="inner">
        <li class="list">
          <span class="t">标签总数</span>
          <span class="n">1578</span>
        </li>
        <li class="list">
          <span class="t">系统打标签数</span>
          <span class="n">0</span>
        </li>
         <li class="list">
          <span class="t">情报标签数量</span>
          <span class="n">0</span>
        </li>
        <li class="list">
          <span class="t">人员标签数量</span>
          <span class="n">0</span>
        </li>
      </ul>
    </div>
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
@import '../../assets/css/common';
.overview{
  .wrap{
    background:url(../../assets/img/dot-hd.png) no-repeat 0 0;
    height:88px;
    border:1px solid rgba(34,118,230,0.1);
    background-color: rgba(53,118,205,0.04);
    overflow: hidden;
    margin-bottom:34px;
    .inner{
      height:52px;
      margin:15px 23px 21px 23px;
      overflow: hidden;
      opacity: 1;
      .list{
        float: left;
        overflow: hidden;
        margin-right:88px;
        span{
          display: block;
          float: left;
        }
        .t{
          font-size:16px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          padding:28px 20px 13px 29px;
        }
        .n{
          font-size:36px;
          font-family:Quartz-Bold;
          font-weight:400;
          color:rgba(17,174,255,1);
          padding:13px 0;
        }
      }
    }
  }
}
</style>