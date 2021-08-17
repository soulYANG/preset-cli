<template>
  <div id="policeContentWrap">
    <TabsComponent @handleCurrentIndex="handleCurrentIndex" />
    <template v-if="currentIndex == 0">
      <div class="policeContentInnerWrapper">
        <HotwordsComponent />
        <PropertySurveillanceComponent />
      </div>
      <div class="moduleHeader">
        <span class="title">警情检测</span>
      </div>
      <SurveillanceComponent />
    </template>
    <template v-if="currentIndex == 1">
      <PoliceInfomation />
    </template>
  </div>
</template>

<script>
import TabsComponent from "./components/Tabs.vue";
import HotwordsComponent from "./components/HotWords.vue";
import PropertySurveillanceComponent from "./components/PropertySurveillance.vue";
import SurveillanceComponent from "./components/Surveillance.vue";
import PoliceInfomation from "./components/PoliceInfomation.vue";

export default {
  name: "policeContent",
  components: {
    TabsComponent,
    HotwordsComponent,
    PropertySurveillanceComponent,
    SurveillanceComponent,
    PoliceInfomation,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    handleCurrentIndex(val) {
      this.currentIndex = val;
    },
  },
};
</script>

<style lang="less" scoped>
#policeContentWrap {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 98vw;
  height: calc(100vh - 130px);
  .policeContentInnerWrapper {
    width: 100%;
    height: 400px;
    display: flex;
  }
  // background: red;
  .moduleHeader {
    color: #fff;
    height: 50px;
    line-height: 30px;
    .title {
      font-size: 20px;
      width: 80px;
      height: 28px;
      font-family: PingFang SC;
      font-weight: normal;
      font-stretch: normal;
      line-height: 28px;
      letter-spacing: 0px;
      color: #ffffff;
      top: 12px;
      position: relative;
      left: 39px;
    }
  }
}
</style>
