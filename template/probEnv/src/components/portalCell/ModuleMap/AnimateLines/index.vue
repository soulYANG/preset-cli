<template>
  <div class="lines-canvas-container">
    <canvas id="lines" class="lines-canvas" />
  </div>
</template>

<script>
import AnimateLine from './AnimateLine';
import { linePoints } from './constants';

let i = 0;
export default {
  data(){
    return{
    }
  },
  props:[],
  components:{
  },
  methods:{
    AnimateLines() {
      const lineModel = new AnimateLine('lines');
      const timer = setInterval(() => {
        i = ++i % linePoints.length;
        lineModel.start({ points: linePoints[i] });
        return () => clearInterval(timer);
      }, 3000);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.AnimateLines();
    });
  }
}

</script>

<style scoped lang="less">
.lines-canvas-container {
  position: absolute;
  .lines-canvas {
    position: absolute;
    top: 280px;
    left: 20px;
  }
}
</style>