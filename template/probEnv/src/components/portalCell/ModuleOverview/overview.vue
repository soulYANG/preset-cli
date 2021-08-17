<template>
  <ul class="top">
    <li v-for="(item,id) in list" :key="id" :class="[item.name=='核心人员'?'hxry':item.name=='失控人员'?'skry':'zyqb']">
      <span class="t">{{item.name}}</span>
      <span class="n">{{item.currentNum}}<i class="icon marker" v-if="item.name=='失控人员'"></i></span>
    </li>
  </ul>
</template>

<script>
import { apiGetStatistics} from '@/api/portal-requst'
export default {
  data(){
    return{
      list:[]
    }
  },
  props:[],
  components:{

  },
  methods:{

  },
  mounted() {
    this.$nextTick(() => {
      apiGetStatistics({parentId:170}).then(res => {
        if(res.code==200){
          this.list = res.data.filter(item => item.name=='重大警情'||item.name=='核心人员'||item.name=='失控人员');
        }else{
          this.$message(res.message);
        }
      })
    });
  }
}
</script>
<style lang="less" scoped>
.top{
  display: flex;
  align-items: center;
  justify-content: space-around;
  .t{
    font-size:18px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height:33px ;
    width:98px;
    display: block;
  }
  .n{
    font-size:40px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(201,217,246,1);
    text-align: center;
    line-height: 40px;
    width:98px;
    display: flex;
    margin-top:16px;
    align-items: center;
    justify-content: center;
    .icon{
      width:29px;
      height:29px;
      overflow: hidden;
      margin-left:12px;
    }
  }
  .zyqb{
    .t{
      background:url(../../../assets/img/portal/zy-bg.png) no-repeat 0 0;
    }
  }
  .hxry{
    .t{
      background:url(../../../assets/img/portal/hx-bg.png) no-repeat 0 0;
    }
  }
  .skry{
    .t{
      background:url(../../../assets/img/portal/sk-bg.png) no-repeat 0 0;
    }
    .n{
      justify-content: flex-end;
      .marker{
        background:url(../../../assets/img/portal/marker-icon.png) no-repeat 0 0;
      }
    }
  }
}
</style>