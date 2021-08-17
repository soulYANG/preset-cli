<template>
  <div class="header">
    <div class="logo">
      <a :href="callBackUrl">
        <img class="" src="../../assets/img/logo_01.png" />
      </a>
        <img class="" src="../../assets/img/logo_02.png" />
    </div>
    <div class="user-layout">
      <span class="name">{{userName}}</span>
      <!-- <span class="logout" @click="logout"></span> -->
    </div>
  </div>
</template>
<script>
import { apiGetCurrentUser} from '../../api/label-requst'
import {storage} from "../../utils/tool";
import { callBackUrl } from '../../utils/http';
export default {
  data(){
    return{
      userName:storage.get('userName')|| '',
      callBackUrl
    }
  },
  props:['args'],
  methods:{
  },
  mounted() {
    this.$nextTick(() => {
      apiGetCurrentUser({}).then(res => {
        if(res.code==200){
          storage.set('userName',res.data.xm);
          this.userName = res.data.xm;
        }else{
          this.$message(res.message);
        }
      })
    });
  }
}
</script>
<style lang="less" scoped>
.header{
  background:url(../../assets/img/header.png) no-repeat 0 0;
  background-size:100% 100%;
  height:108px;
  margin-top:22px;
  position: relative;
  .logo{
    display: block;
    padding-top:16px;
    text-align:center;
  }
  .user-layout{
    position: absolute;
    top:0;
    right:27px;
    .name{
      font-size:20px;
      font-family:PingFang SC;
      color:rgba(255,255,255,1);
      margin-right:36px;
      vertical-align: top;
    }
    .logout{
      background:url(../../assets/img/guan.png) no-repeat 0 0;
      width:23px;
      height:23px;
      display: inline-block;
    }
  }
}
</style>