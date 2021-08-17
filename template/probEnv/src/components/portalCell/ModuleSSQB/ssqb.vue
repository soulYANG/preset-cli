<template>
  <div class="ssqb">
    <div class="cont">
      <div class="inner">
        <div class="cont-lf">
          <div class="list" v-for="(item,id) in listData.data" :key="id">
            <span class="t">{{item.name}}</span>
            <span class="num">{{item.currentNum||0}}</span>
          </div>
        </div>
      </div>
       <ul>
        <li v-for="(item,id) in listData.data" :key="id" :class="starColors[item.level]">
          <span class="txt">{{item.title}}</span>
          <span class="status" v-html="starFun(item.level||0)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { apiGetQueryssqb } from '@/api/portal-requst';

export default {
  data(){
    return{
      listData:{},
      pageNumber:1,
      pageSize:6,
      starColors: ['', 'blue', 'blue', 'yellow', 'orange', 'red']
    }
  },
  props:[],
  methods:{
    formatTime(time){
      return `[${this.$moment(time, "hmm").format("HH:mm")}]`;
    },
    starFun(level){
      let max = 5;
      let num = max-level;
      let tpl = '';
      for (let index = 0; index < level; index++) {
       tpl+= `<i class="el-icon-star-on" style="color:${this.starColors[level]}"></i>`;
      }
      for (let index = 0; index < num; index++) {
       tpl+= `<i class="el-icon-star-on" style="color:#fff"></i>`;
      }
      return tpl;
    },
    getSSQB(){
      apiGetQueryssqb({}).then(res => {
        if(res.code==200){
          this.listData = res;
        }else{
          this.$message(res.message);
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getSSQB();
      let timer = 0;
      clearInterval(timer);
      timer = setInterval(()=>{
        this.getSSQB();
      },300000);
    });
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/portal-content';
</style>