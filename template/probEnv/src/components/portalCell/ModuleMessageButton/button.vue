<template>
  <div class="message-button">
    <div class="can-bg"></div>
    <div class="label" @click="isShowWindow=true">待查看</div>
    <div class="count">8</div>
    <pop :isShowWindow.sync='isShowWindow' />
  </div>
</template>

<script>
import pop from './pop'
export default {
  data(){
    return{
      isShowWindow: false
    }
  },
  props:[],
  components:{
    pop
  },
  methods:{
    showWindow(){
      this.isShowWindow = true;
    },
  },
  mounted() {
    this.$nextTick(() => {

    });
  }
}
</script>
<style lang="less" scoped>
.message-button {
  width: 117px;
  height: 129px;
  position: relative;
  z-index:10;
  &:before {
    content: '';
    position: absolute;
    width: 51px;
    height: 51px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: url(../../../assets/img/portal/message-icon.png) 100% 100%;
  }
  &:after {
    content: ' ';
    display: block;
    background-image: linear-gradient(44deg, rgba(24, 43, 90, 0) 50%, #0397D6 100%);
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    animation: radar-beam 5s infinite;
    animation-timing-function: linear;
    transform-origin: bottom right;
    border-radius: 100% 0 0 0;
  }
  > div {
    position: absolute;
  }
  > .label {
    text-align: center;
    width: 44px;
    height: 16px;
    background: rgb(18, 131, 205);
    font-size: 14px;
    line-height: 16px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 50px auto;
    color:#fff;
    cursor: pointer;
  }
  > .count {
    background: red;
    border-radius: 50%;
    right: 30px;
    top: 30px;
    width: 18px;
    height: 18px;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    box-shadow: 3px 3px 3px black;
    color:#fff;
  }
  .can-bg{
    width:120px;
    height:120px;
    background:url(../../../assets/img/portal/message-bg.png) no-repeat center center;
    animation: radar-beam-two 50s infinite;
    animation-timing-function: linear;
  }
  @keyframes radar-beam {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes radar-beam-two {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
</style>