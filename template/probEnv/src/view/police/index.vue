<template>
  <div class="layout" ref="js_layout">
    <div id="starsBox"></div>
    <headerCell />
    <contentCell />
  </div>
</template>
<script>
import headerCell from "@/components/police/header";
import contentCell from "@/components/police/content";

export default {
  data() {
    return {};
  },
  name: "police",
  methods: {},
  components: {
    headerCell,
    contentCell,
  },
  methods: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      clearInterval(timer)
      var cols = [
        "#f5d76e",
        "#f7ca18",
        "#f4d03f",
        "#ececec",
        "#ecf0f1",
        "#a2ded0",
      ];
      var stars = 150;
      var tpl = "";
      for (var i = 0; i <= stars; i++) {
        var size = Math.random() * 3;
        var color = cols[parseInt(Math.random() * 4)];
        tpl +=
          '<span style=" width: ' +
          size +
          "px; height: " +
          size +
          "px; top: " +
          Math.random() * 100 +
          "%; left: " +
          Math.random() * 100 +
          "%; background: " +
          color +
          "; box-shadow: 0 0 " +
          Math.random() * 10 +
          "px" +
          color +
          ';"></span>';
      }
      document.querySelector("#starsBox").innerHTML = tpl;
      document.querySelectorAll("#starsBox span").forEach(function (item) {
        item.style.position = "absolute";
        item.style.borderRadius = "100%";
        item.style.transition = "100s linear";
        item.style.display = "nline-block";
      });
      setTimeout(function () {
        document.querySelectorAll("#starsBox span").forEach(function (item) {
          item.style.top = Math.random() * 100 + "%";
          item.style.left = Math.random() * 100 + "%";
        });
      }, 1);
      let timer = setInterval(function () {
        document.querySelectorAll("#starsBox span").forEach(function (item) {
          item.style.top = Math.random() * 100 + "%";
          item.style.left = Math.random() * 100 + "%";
        });
      }, 100000);
    });
  },
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background: #0e1631 url(../../assets/img/bodyBg.png) no-repeat 0 0;
  background-size: 100% 100%;
}
#starsBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.75);
  opacity: 0.5;
}
#starsBox span {
  display: inline-block;
  width: auto;
  position: absolute;
  border-radius: 100%;
  transition: 100s linear;
}
</style>
