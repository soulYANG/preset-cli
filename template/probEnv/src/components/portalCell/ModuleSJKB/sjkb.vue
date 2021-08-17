<template>
  <div class="sjkb">
    <div class="cont">
      <el-carousel trigger="click" height="170px" :interval="8000">
        <el-carousel-item>
          <div class="tit">今日态势</div>
          <div id="myChart1" style="width:440px;height:240px;position:relative;top:-45px;" />
        </el-carousel-item>
        <el-carousel-item>
          <div class="tit">季度态势</div>
          <div id="container2" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { apiGetChartToday, apiGetChartQuarter } from '@/api/portal-requst';
import { Chart } from '@antv/g2';

export default {
  data(){
    return{
    }
  },
  props:[],
  methods:{
    dataSet2Fun(data){
      const chart = new Chart({
        container: 'container2',
        autoFit: true,
        height: 150
      });
      chart.data(data);
      chart.scale({
        waiting: {
          min: 0,
          max:10,
          nice: true,
        }
      });
      chart.legend({
        custom: true,
        items: [
          { value: 'week', name: '周', marker: { symbol: 'hyphen', style: { stroke: '#3182bd', r: 5 ,lineWidth: 3 } } },
          { value: 'month', name: '月', marker: { symbol: 'hyphen', style: { stroke: '#1AF198', r: 5, lineWidth: 3 } } }
        ],
      });
      chart.tooltip({
        shared: true,
      });
      chart.interval()
        .position('week*month')
        .color('#1AF198');
      chart.line()
        .position('week*num')
        .color('#11A0FA')
        .size(1)
        .shape('smooth');
      // chart.point()
      //   .position('week*num')
      //   .color('#11A0FA')
      //   .size(1)
      //   .shape('circle');
      chart.axis('week',false);
      chart.axis('num',false);

      chart.interaction('active-region');
      chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
      chart.render();
    },
    echartsLine(lineData){
      lineData = lineData || {};
      let xAxisData = [];
      let seriesData = [];
      lineData.forEach(element => {
        xAxisData.push(element.name);
        seriesData.push(element.currentNum);
      });
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart1'));
      let option = {
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
            }
          },
        },
        series: [{
          data: seriesData,
          type: 'line',
          smooth: true,
          color:'#0E7CC7'
        }]
      };
      // 绘制图表
      myChart.setOption(option);
    }
  },
  mounted() {
    this.$nextTick(() => {
      apiGetChartToday({parentId:20}).then(res => {
        if(res.code==200){
          this.echartsLine(res.data);
        }else{
          this.$message(res.message);
        }
      });
      apiGetChartQuarter({year:2020}).then(res => {
        if(res.code==200){
          this.dataSet2Fun(res.data);
        }else{
          this.$message(res.message);
        }
      });
    });
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/portal-content';
/deep/ .el-carousel__indicators--horizontal{
  display:none;
}
</style>