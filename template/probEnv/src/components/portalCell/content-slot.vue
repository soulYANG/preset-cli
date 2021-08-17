<template>
  <div>
    <div class="block"  v-for="(i,index) in moduleData" :key="index" >
      <div v-if="location=='left'?index<3:index>=3">
        <div class="title">
          <div class="nav">
            <span class="tag current">
              <i class="icon"></i>{{titleData[i.moduleId]}}
            </span>
          </div>
          <div class="btns">
            <span class="put"></span>
            <span class="setting" @click="showSetingWindow(index)"></span>
          </div>
        </div>

        <TZTB v-if="i.moduleId==0" />
        <ZYZL v-if="i.moduleId==1" />
        <QBYP v-if="i.moduleId==2" />
        <SSQB v-if="i.moduleId==3" />
        <SSYJ v-if="i.moduleId==4" />
        <CYJK v-if="i.moduleId==5" />
        <RDQB v-if="i.moduleId==6" />
        <SJKB v-if="i.moduleId==7" />
        <DSQY v-if="i.moduleId==8" />

        <div class="window" v-if="i.isShowWindow&&i.isShowWindow==true">
          <ul class="inner">
            <li @click="setTopic(index,item.id)" v-for="(item,id) in windowSetingData" :key="id">
              <img :src="item.url" alt="">
              <span class="t">{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-icon border-top-left-icon"></div>
    <div class="border-icon border-top-right-icon"></div>
    <div class="border-icon border-bom-left-icon"></div>
    <div class="border-icon border-bom-right-icon"></div>
  </div>
</template>
<script>
import TZTB from '@/components/portalCell/ModuleTZTB/tztb';
import SSQB from '@/components/portalCell/ModuleSSQB/ssqb';
import ZYZL from '@/components/portalCell/ModuleZYZL/zyzl';
import QBYP from '@/components/portalCell/ModuleQBYP/qbyp';
import SSYJ from '@/components/portalCell/ModuleSSYJ/ssyj';
import CYJK from '@/components/portalCell/ModuleCYJK/cyjk';
import RDQB from '@/components/portalCell/ModuleRDQB/rdqb';
import SJKB from '@/components/portalCell/ModuleSJKB/sjkb';
import DSQY from '@/components/portalCell/ModuleDSQY/dsqy';
import { apiInsertUserModule } from '@/api/portal-requst';
export default {
  data(){
    return{
      moduleData:[],
      windowSetingData:[
        {
          id:0,
          title:'通知通报',
          url: require('../../assets/img/portal/tz_ico.png')
        },
        {
          id:1,
          title:'重要指令',
          url: require('../../assets/img/portal/zl_ico.png')
        },
        {
          id:2,
          title:'情报预判',
          url: require('../../assets/img/portal/yp_ico.png')
        },
        {
          id:3,
          title:'情报预警',
          url: require('../../assets/img/portal/qb_ico.png')
        },
        {
          id:4,
          title:'实时预警',
          url: require('../../assets/img/portal/yj_ico.png')
        },
        {
          id:5,
          title:'词域监控',
          url: require('../../assets/img/portal/jk_ico.png')
        },
        {
          id:6,
          title:'热点情报',
          url: require('../../assets/img/portal/rd_ico.png')
        },
        {
          id:7,
          title:'数据看板',
          url: require('../../assets/img/portal/kb_ico.png')
        },
        {
          id:8,
          title:'大事牵引',
          url: require('../../assets/img/portal/ds_ico.png')
        },
      ],
      titleData:['通知通报','重要指令','情报预判','情报预警','实时预警','词域监控','热点情报','数据看板','大事牵引']
    }
  },
  props:['topicData','location'],
  components:{
    TZTB,//通知通报 0
    ZYZL,//重要指令 1
    QBYP,//情报预判 2
    SSQB,//实时情报 3
    SSYJ,//实时预警 4
    CYJK,//词域监控 5
    RDQB,//热点情报 6
    SJKB,//数据看板 7
    DSQY,//大事牵引 8
  },
  methods:{
    showSetingWindow(index){
      this.moduleData[index].isShowWindow = !this.moduleData[index].isShowWindow;
    },
    setTopic(index,id){
      this.moduleData[index].moduleId = id;
      this.moduleData[index].isShowWindow= false;
      this.moduleData.functionId = index;

      this.insertUserModule(this.moduleData);
    },
    insertUserModule(args){
      apiInsertUserModule(args).then(res => {
        if(res.code!=200){
          this.$message(res.message);
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.moduleData = this.topicData;
    });
  }
}
</script>
<style lang="less" scoped>
</style>