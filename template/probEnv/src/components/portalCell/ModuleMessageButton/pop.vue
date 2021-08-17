<template>
  <div class="popover" v-if="isShowWindow">
    <!-- 只展示3条数据 -->
    <ul class="inner">
      <li @click="showDetailsPop">水果批发商王某因为不满新市场摊位分配方案，再加上自从搬到新市场后，其生意一直不如以前，市场管理方发生冲突，市场方报警。</li>
      <li @click="showDetailsPop">重点人员张XX发现于XX高速南分段行驶，请各部门注意</li>
      <li @click="showDetailsPop">水果批发商王某因为不满新市场摊位分配方案，再加上自从搬到新市场后，其生意一直不如以前，市场管理方发生冲突，市场方报警。</li>
    </ul>
    <div class="close-btn" @click="hideWindow"><i class="el-icon-close"></i></div>
    <detailsPop :isShowDetailsPop.sync='isShowDetailsPop' />
  </div>
</template>

<script>
import detailsPop from './detailsPop'
export default {
  data(){
    return{
      isShowDetailsPop:false
    }
  },
  props:['isShowWindow'],
  components:{
    detailsPop
  },
  methods:{
    hideWindow(){
      this.$emit('update:isShowWindow', false);
    },
    showDetailsPop(){
      this.isShowDetailsPop = true;
    }
  },
  mounted() {
    this.$nextTick(() => {

    });
  }
}
</script>

<style lang="less" scoped>
.popover{
  width:513px;
  height:185px;
  background:rgba(14,28,61,1);
  border:1px solid rgba(81,117,206,1);
  opacity:0.95;
  border-radius:6px;
  position: absolute;
  right:35px;
  top:-200px;
  overflow: hidden;
  .inner{
    margin:11px 25px 29px 22px;
    li{
      width:452px;
      font-size:14px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      padding:14px 0;
      border-bottom:1px solid #2A3C65;
      line-height: 16px;
      cursor: pointer;
      &:last-child{
        border-bottom: none;
      }
    }
  }
  .close-btn{
    position: absolute;
    top:10px;
    right:10px;
    color:#fff;
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>