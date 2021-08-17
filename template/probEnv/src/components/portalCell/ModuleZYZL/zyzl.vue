<template>
  <div class="zyzl">
    <div class="cont">
      <div class="inner">
        <div class="list" v-for="(item,index) in numsData" :key="index">
          <span class="t">{{item.name}}</span>
          <span class="num">{{item.currentNum}}</span>
        </div>
      </div>
      <ul>
        <li v-for="(item,id) in listData.list" :key="id" :class="[item.state=='已反馈'?'green':item.state=='超时未反馈'?'red':'blue']">
          <span class="status">{{item.state}}</span>
          <span class="txt">{{item.title}}</span>
          <span class="time" v-html="formatTime(item.datetime)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { apiGetGagezyzl, apiGetQueryByParentId } from '@/api/portal-requst';

export default {
  data(){
    return{
      listData:{},
      pageNumber:1,
      pageSize:3,
      numsData:[]
    }
  },
  props:[],
  methods:{
    formatTime(time){
      return `[${this.$moment(time, "hmm").format("HH:mm")}]`;
    },
    getZYZL(){
      apiGetGagezyzl({pageNumber:this.pageNumber,pageSize:this.pageSize}).then(res => {
        if(res.code==200){
          this.listData = res.data;
        }else{
          this.$message(res.message);
        }
      });
    },
    getNums(){
      apiGetQueryByParentId({parentId:130}).then(res => {
        if(res.code==200){
          this.numsData = res.data;
        }else{
          this.$message(res.message);
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getZYZL();
      this.getNums();
      let timer = 0;
      clearInterval(timer);
      timer = setInterval(()=>{
        this.getZYZL();
        this.getNums();
      },300000);
    });
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/portal-content';
</style>