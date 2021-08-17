<template>
  <div class="tabBar">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="tabItem"
      @click="handleTabClick(index)"
      :class="{ tabChosen: currentIndex == index }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: ["首页", "警情全要素查询"],
      currentIndex: 0,
    };
  },
  methods: {
    handleTabClick(i) {
      this.currentIndex = i;
      this.$emit("handleCurrentIndex", i);
    },
  },
};
</script>

<style lang="less" scoped>
.tabBar {
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  border-bottom: solid 2px #003a67;
  .tabItem {
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    // width: 44px;
    height: 40px;
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 40px;
    letter-spacing: 0px;
    color: #48afff;
    margin-left: 20px;
  }
  .tabChosen {
    border-bottom: solid 3px #48afff;
  }
}
</style>