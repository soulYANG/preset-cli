<template>
  <div class="qbyp">
    <div class="cont">
      <div class="list-vertical">
        <ul class="inner">
          <li class="icon train"></li>
          <li :class="{'current':tab1==true}">紧急</li>
          <li :class="{'current':tab2==true}">非紧急</li>
        </ul>
      </div>
      <div class="list-cross">
        <ul class="table-name">
          <li class="current">敏感</li>
          <li>重要</li>
          <li>关注</li>
          <li>一般</li>
        </ul>
        <ul class="list-num" v-for="(item,index) in resData" :key="index" :class="{'list-second':index===1}">
          <li class="sensitive" :class="{'current':index==0}">{{item[0]}}</li>
          <li class="important">{{item[1]}}</li>
          <li class="focus">{{item[2]}}</li>
          <li class="general">{{item[3]}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetQueryqbypCount } from '@/api/portal-requst';

export default {
  data(){
    return{
      resData:[],
      tab1:true,
      tab2:false,
    }
  },
  props:[],
  methods:{
    changeTab(){
      clearInterval(timer);
      clearInterval(timer2);
      let index = 0;
      let timer = setInterval(()=>{
        if(this.tab1 == true){
          this.tab1 = false;
          this.tab2 = true;
          index = -1;
        }else{
          this.tab1 = true;
          this.tab2 = false;
          index = -1;
        }
      },20000);
      let timer2 = setInterval(()=>{
        let doms = document.querySelectorAll('.table-name li');
        let doms1 = document.querySelectorAll('.list-num li');
        let doms2 = document.querySelectorAll('.list-second li');
        init(doms);
        index++;
        addCls(doms[index]);
        if(this.tab1){
          init(doms1);
          addCls(doms1[index]);
        }
        if(this.tab2){
          init(doms1);
          init(doms2);
          addCls(doms2[index]);
        }
      },5000);
      function init(doms){
        if(!doms.length){
          return;
        }
        for(var i=0;i<doms.length;i++){
          doms[i].classList.remove('current');
        }
      }
      function addCls(dom){
        if(!dom){
          return;
        }
        dom.classList.add('current');
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      apiGetQueryqbypCount({}).then(res => {
        if(res.code==200){
          this.resData = res.data;
          this.changeTab();
        }else{
          this.$message(res.message);
        }
      })
    });
  }
}
</script>

<style lang="less" scoped>
</style>