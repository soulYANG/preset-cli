<template>
  <div class="map">
    <img class="map-bg" src="../../../assets/img/portal/map-bg.png" alt="">
    <div class="city zhangjiagangs">
      <span class="name">张家港市</span>
      <span class="red-round"></span>
    </div>
    <div class="city changshus">
      <span class="name">常熟市</span>
      <span class="red-round"></span>
    </div>
    <div class="city taicangs">
      <span class="name">太仓市</span>
      <span class="red-round"></span>
    </div>
    <div class="city xiangchengs">
      <span class="name">相城区</span>
      <span class="red-round"></span>
    </div>
    <div class="city gongyeyuans">
      <span class="name">工业园区</span>
      <div class="circle">
        <span class="red-round"></span>
        <span class="small"></span>
      </div>
    </div>
    <div class="city kunshans">
      <span class="name">昆山市</span>
      <div class="circle">
        <span class="red-round"></span>
        <span class="small"></span>
      </div>
    </div>
    <div class="city gaoxins">
      <span class="name">高新区</span>
      <span class="red-round"></span>
    </div>
    <div class="city gusus">
      <span class="name">姑苏区</span>
      <span class="red-round"></span>
    </div>
    <div class="city wujings">
      <span class="name">吴中区</span>
      <div class="circle">
        <span class="red-round"></span>
        <span class="small"></span>
      </div>
    </div>
    <div class="city wuzhongs">
      <span class="name">吴江区</span>
      <div class="map-point alert" style="transform: translate(-50%, -50%) rotateX(50deg)">
        <div class="speed-border speed-animate" style="animationDelay:0s"/>
        <div class="speed-border speed-animate" style="animationDelay:1s" />
        <div class="speed-border speed-animate" style="animationDelay:2s" />
      </div>
      <div class="jt"></div>
    </div>
    <AnimateLines />
  </div>
</template>

<script>
import AnimateLines from './AnimateLines/index';

export default {
  data(){
    return{
    }
  },
  props:[],
  components:{
    AnimateLines
  },
  methods:{

  },
  mounted() {
    this.$nextTick(() => {
    });
  }
}
</script>
<style lang="less" scoped>
.map{
  position: relative;
  height:34.6vw;
  margin-top:30px;

  .map-bg{
    // width:100%;
    position: absolute;
    top:0;
    left:65px;
    display:block;
  }
  .circle{
    position: relative;
    width: 24px;
    height: 24px;
    display: none;
    transform: translate(-50%, -50%) rotateX(50deg);
    .red-round{
      top: -6px;
      left: -6px;
      width: 100%;
      height: 100%;
      background:rgba(255, 0, 0, 1);
      border-radius: 50%;
      position: absolute;
      animation: twinkling 1s infinite ease-in-out;
      animation-fill-mode: both;
    }
    .small{
      border-radius: 50%;
      width: 12px;
      height: 12px;
      background: #FF0033;
      position: absolute;
    }
  }
  .city{
    position: absolute;
    .name{
      font-size:16px;
      font-family:PingFang SC;
      color:rgba(255,255,255,1);
    }
  }
  .zhangjiagangs{
    left:50%;
    top:2.7%;
  }
  .changshus{
    left:60%;
    top:7.5%;
  }
  .taicangs{
    left:73%;
    top:8.7%;
  }
  .xiangchengs{
    left:53%;
    top:11.7%;
  }
  .kunshans{
    left:70%;
    top:13.8%;
    .circle{
      margin-top:15px;
      margin-left:40px;
      display: block;
    }
  }
  .gongyeyuans{
    left:62%;
    top:15.8%;
    .circle{
      margin-top:15px;
      margin-left:40px;
      display: block;
    }
  }
  .gaoxins{
    left:42%;
    top:14.6%;
  }
  .gusus{
    left:52%;
    top:16.4%;
  }
  .wujings{
    left:30%;
    top:23%;
    .circle{
      margin-top:20px;
      display: block;
    }
  }
  .wuzhongs{
    left:50%;
    top:38%;
    .circle{
      margin-top:-40px;
      margin-left:52px;
      display: block;
    }
    .map-point{
      left:47px;
      top:-14px;
    }
    .jt{
      width:68px;
      height:75px;
      background:url(../../../assets/img/portal/red-arrow.png) no-repeat 0 0;
      margin-top:-95px;
      margin-left:12px;
    }
  }
  .map-point {
    position: absolute;
    width: 16px;
    height: 16px;
    background: rgb(255, 0, 0);
    border-radius: 50%;
    padding: 8px 0;
    z-index: 3;
    &.alert {
      width: 0;
      height: 0;
      .speed-border {
        width: 40px;
        height: 40px;
        top: -10px;
        left: -20px;
      }
    }
    > div {
      color: black;
      text-align: center;
      line-height: 1rem;
      white-space: nowrap;
    }
    .speed-border {
      width: 20px;
      height: 20px;
      background: radial-gradient(rgba(255, 0, 0, 1), rgba(255, 0, 0, .7), rgba(255, 0, 0, .4));
      border-radius: 50%;
      position: absolute;
      z-index: 1000;
      top: -2px;
      left: -2px;
    }
    &.green {
      background: rgb(17, 144, 109);
      .speed-border {
        background: radial-gradient(rgba(17, 144, 109, 1), rgba(17, 144, 109, .7), rgba(17, 144, 109, .4));
      }
    }
    &.yellow {
      background: rgb(138, 140, 0);
      .speed-border {
        background: radial-gradient(rgba(138, 140, 0, 1), rgba(138, 140, 0, .7), rgba(138, 140, 0, .4));
      }
    }
    &.orange {
      background: rgb(238, 148, 12);
      .speed-border {
        background: radial-gradient(rgba(238, 148, 12, 1), rgba(238, 148, 12, .7), rgba(238, 148, 12, .4));
      }
    }
    transform: translate(-50%, -50%) rotateX(40deg);
  }
  .speed-animate {
    animation: speed-animate 3s .2s linear infinite;
  }
  @keyframes speed-animate {
    0% {
      transform: scale(.2);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  @keyframes twinkling {
    0% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.12);
    }
    100% {
      opacity: 0.2;
      transform: scale(1);
    }
  }
}
</style>