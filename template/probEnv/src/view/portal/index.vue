<template>
  <div class="layout" ref="js_layout">
    <div class="content">
      <img src="../../assets/img/portal/bg.png" class="bg" alt="">
      <headerCell />
      <div class="wrap">
        <div class="left">
          <div class="inner">
            <contentSlot v-if="topicData.length" location="left" :topicData="topicData"></contentSlot>
          </div>
        </div>
        <div class="center"><contentCenterCell /></div>
        <div class="right">
          <div class="inner">
            <contentSlot v-if="topicData.length" location="right" :topicData="topicData"></contentSlot>
          </div>
        </div>
      </div>
      <footerCell />
      <div class="border-left-icon"></div>
      <div class="border-right-icon"></div>
      <div class="border-bottom-icon"></div>
      <div class="right-message-btn">
        <messageButtonCell />
      </div>
    </div>
  </div>
</template>

<script>
import headerCell from '@/components/portalCell/header'
import contentCenterCell from '@/components/portalCell/content-center'
import footerCell from '@/components/portalCell/footer'
import messageButtonCell from '@/components/portalCell/ModuleMessageButton/button'
import contentSlot from '@/components/portalCell/content-slot'
import { apiGetQueryUserModule } from '@/api/portal-requst'
export default {
  data(){
    return{
      defaultData:[
        {
          moduleId:0,
          functionId:0,
          isShowWindow:false
        },
        {
          moduleId:1,
          functionId:1,
          isShowWindow:false
        },
        {
          moduleId:2,
          functionId:2,
          isShowWindow:false
        },
        {
          moduleId:4,
          functionId:4,
          isShowWindow:false
        },
        {
          moduleId:5,
          functionId:5,
          isShowWindow:false
        },
        {
          moduleId:7,
          functionId:7,
          isShowWindow:false
        },
        {
          moduleId:8,
          functionId:8,
          isShowWindow:false
        }
      ],
      topicData:[]
    }
  },
  name: 'portal_index',
  components: {
    headerCell,
    footerCell,
    contentCenterCell,
    messageButtonCell,
    contentSlot
  },
  methods:{
    getQueryUserModule(){
      apiGetQueryUserModule({}).then(res => {
        if(res.code==200){
          if(res.data.length>=6){
            res.data.forEach(element => {
              element.isShowWindow = false;
            });
            this.topicData = res.data;
          }else{
            this.topicData = this.defaultData;
          }
        }else{
          this.$message(res.message);
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getQueryUserModule();
    });
  }
}
</script>

<style lang="less" scoped>
.layout{
  width:100%;
  height:100vh;
  margin:0 auto;
  overflow: hidden;
  background:RGBA(2, 24, 62, 1);
  .content{
    width:98vw;
    height:100%;
    margin:0 auto;
    position: relative;
    .bg{
      position: absolute;
      top:0;
      left:0;
      width:100%;
    }
    .wrap{
      width:100%;
      display: flex;
      position: relative;
      .left{
        width:25%;
        margin-top:-20px;
        margin-left:30px;
        overflow: hidden;
      }
      .center{
        width:50%;
        margin-top:30px;
        overflow: hidden;
      }
      .right{
        width:25%;
        margin-top:-20px;
        margin-right:30px;
        overflow: hidden;
      }
    }
    .border-left-icon{
      position: absolute;
      left:0;
      top:90px;
      background:url(../../assets/img/portal/right-line-bg.png) no-repeat center center;
      width:5px;
      height:955px;
      transform:rotate(180deg);
      -webkit-transform:rotate(180deg);
    }
    .border-right-icon{
      position: absolute;
      right:0;
      top:90px;
      background:url(../../assets/img/portal/right-line-bg.png) no-repeat center center;
      width:5px;
      height:955px;
    }
    .border-bottom-icon{
      position: absolute;
      right:0;
      bottom:2px;
      background:url(../../assets/img/portal/footer-line-bg.png) no-repeat center center;
      background-size:100% 100%;
      width:100%;
      height:10px;
    }
    .right-message-btn{
      position: fixed;
      right:1vw;
      bottom:-10px;
      z-index:10;
    }
  }
}
</style>
