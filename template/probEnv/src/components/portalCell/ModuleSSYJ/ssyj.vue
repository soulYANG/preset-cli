<template>
  <div class="ssyj">
    <!-- <div class="title">
      <div class="nav">
        <span class="tag current">
          <i class="icon"></i>
          实时预警  34
          <b class="t">待处置</b>
          <b class="n">17</b>
        </span>
      </div>
      <div class="btns">
        <span class="put"></span>
        <span class="setting"></span>
      </div>
    </div> -->
    <div class="cont">
      <ul class="">
        <li v-for="(item,id) in list" :key="id">
          <span class="status" :class="[item.type=='train' ? 'train' : (item.type=='warning' ? 'camera' : 'user') ]"></span>
          <span class="txt" v-if="item.type=='train'">
            {{item.time}} 铁路预警 {{item.content.name}} 乘坐 {{item.content.trainNumber}}{{item.content.carriageNumber}}车{{item.content.seatNumber}},出发站：{{item.content.startStation}},到达站：{{item.content.endStation}}
          </span>
          <span class="txt" v-else-if="item.type=='image'">
            {{item.time}} 人像轨迹 {{item.content.name}} 拍摄地点：{{item.content.address}}
          </span>
          <span class="txt" v-else>
            {{item.time}} 详细信息：{{item.content.information}}
          </span>
          <span class="time" v-html="formatTime(item.time)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { apiGetQueryssyj} from '@/api/portal-requst';

export default {
  data(){
    return{
      list:[]
    }
  },
  props:[],
  methods:{
    formatTime(time){
      return `[${this.$moment(time, "hmm").format("HH:mm")}]`;
    },
    getSSYJ(){
      apiGetQueryssyj({}).then(res => {
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
      this.getSSYJ();
      let timer = 0;
      clearInterval(timer);
      timer = setInterval(()=>{
        this.getSSYJ();
      },300000);
    });
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/portal-content';
</style>