<template>
  <div class="cyjk">
    <el-scrollbar style="height: 100%">
    <div class="cont">
      <ul class="">
        <div class="label">
          <span class="tit">{{labelTitle.tit}}</span>
          <span class="num">{{labelTitle.num}}</span>
        </div>
        <li v-for="(item,index) in list_new" :key="index">
          <span class="tit">{{item.main}}</span>
          <span class="num">{{item.num}}</span>
        </li>
      </ul>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { apiGetRdqbData } from '../../../api/portal-requst'
export default {
  data(){
    return{
      tab1:true,
      tab2:false,
      labelTitle:{
        tit:'我的关注',
        num:'情报数量'
      },
      // list:[
      //   {
      //     title:'北京 and 上访',
      //     num:'68'
      //   },
      //   {
      //     title:'吴江恒业站前广场 and 聚集人群',
      //     num:'68'
      //   },
      //   {
      //     title:'北京 and 上访',
      //     num:'68'
      //   },
      //   {
      //     title:'吴江恒业站前广场 and 聚集人群',
      //     num:'68'
      //   },
      // ],
      list_new:[]
    }
  },
  props:[],
  methods:{
    getRDQB(){

    },
    getRdqbData(){
      apiGetRdqbData().then(res => {


        this.list_new = res.data;
        if(res.code!=200){
          this.$message(res.message);
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getRDQB();
    });
    this.$nextTick(
        this.getRdqbData()
    );
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/portal-content';
.cyjk {
  height:185px;
}
</style>
<style>

.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>