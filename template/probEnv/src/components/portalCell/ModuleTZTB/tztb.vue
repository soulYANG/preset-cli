<template>
  <div class="tztb">
    <div class="cont" @mouseleave="startLoop" @mouseenter="stopLoop">
      <swiper class="draw-swiper-main" :options="swiperOptions" ref="mySwiper">
        <swiper-slide v-for="(item,id) in list" :key="id" class="slider-list">
          <span class="status">{{item.station.substring(0,4)}}</span>
          <span class="txt">{{item.title}}</span>
          <span class="time" v-html="formatTime(item.datetime)"></span>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { apiGetQuerytztb} from '@/api/portal-requst';
export default {
  data(){
    return{
      list:[],
      swiperOptions:{
        direction:'vertical',
        speed:5000,
        autoplay:{
          delay:1,
          disableOnInteraction: false
        },
        loop:false,
        spaceBetween:0,
        slidesPerView:4,
        autoplayDisableOnInteraction:false
      }
    }
  },
  props:[],
  methods:{
    formatTime(time){
      return `[${this.$moment(time.substring(8,12), "hmm").format("HH:mm")}]`;
    },
    stopLoop(){
      this.swiper.$swiper.autoplay.stop();
    },
    startLoop(){
      this.swiper.$swiper.autoplay.start();
    },
    getTZTB(){
      apiGetQuerytztb({}).then(res => {
        if(res.code==200){
          this.list = res.data;
        }else{
          this.$message(res.message);
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTZTB();
      let timer = 0;
      clearInterval(timer);
      timer = setInterval(()=>{
        this.getTZTB();
      },300000);
    });
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper;
    },
  },
}
</script>

<style lang="less">
@import '../../../assets/css/portal-content';
</style>