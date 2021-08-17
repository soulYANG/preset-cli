<template>
  <div class="layout" ref="js_layout">
    <div id="starsBox"></div>
    <headerCell />
    <div class="settingsWrapper">
      <div class="backButton" @click="handleBack"></div>
      <div class="mainContentWrapper">
        <div class="columnNavigator">
          <ul>
            <li
              v-for="(item, index) in naviList"
              :key="index"
              class="naviItem"
              @click="handleItemClicked(index)"
              :class="{ itemFocused: $route.meta.activekey == index }"
            >
              <img
                :src="require(`./components/assets/imgs/img${index}.png`)"
                alt=""
                class="naviIcon"
              />
              <img
                src="./components/assets/imgs/leftArrow.png"
                alt=""
                class="left_arrow"
              />
              <span>{{ item }}</span>
              <img
                src="./components/assets/imgs/rightArrow.png"
                alt=""
                class="right_arrow"
              />
              <div class="focusArrow" v-if="currentIndex == index"></div>
            </li>
          </ul>
        </div>
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerCell from "@/components/police/header";
export default {
  components: {
    headerCell,
  },
  data() {
    return {
      naviList: ["作案方案", "作案地点", "作案时间", "作案描述"],
      currentIndex: 0,
    };
  },
  methods: {
    handleBack() {
      this.$router.push("/police");
    },
    handleItemClicked(i) {
      this.currentIndex = i;
      switch (i) {
        case 0:
          this.$router.push(`/settings/methods`);
          break;
        case 1:
          this.$router.push(`/settings/address`);
          break;
        case 2:
          this.$router.push(`/settings/time`);
          break;
        case 3:
          this.$router.push(`/settings/description`);
          break;
      }
    },
    handleEditButtonCliked() {},
    handleDeleteButtonCliked() {},
  },
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
.settingsWrapper {
  color: white;
  .backButton {
    position: absolute;
    left: 30px;
    top: 30px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: url("./components/assets/imgs/backButton.png") no-repeat;
    background-size: contain;
  }
  .mainContentWrapper {
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100vw;
    height: calc(100vh - 130px);
    display: flex;

    .columnNavigator {
      height: 100%;
      width: 15%;

      &::before {
        position: absolute;
        top: 0px;
        width: 33px;
        height: calc(100vh - 98px);
        background-image: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        content: " ";
      }
      ul {
        margin-left: 34px;
        margin-top: 50px;
        width: 100%;

        .naviItem {
          position: relative;
          width: calc(100% - 34px);
          height: 69px;
          line-height: 69px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAAAqCAYAAADBGtsjAAAFJklEQVR4Xu2cX2hbdRTHz+/emyYp26SjzG2+WPWl6XrTuO5Fn3zZlrr8lU3pkqqvCg7FB8E/a9XJGAPxRVRQp+JgBdOk1ZQNhL7J5qJp1iQPoqUdVAftZlkT8/f+5DbNmmXZcm96fzcNPX37wc3vz+mXw+d3fuccApvgT3QnTwKhw5tgK7iFTW6B2JiFkGbvUXTFP8ml59yCee/bHDEuFyEHt2ZHoaPrGPDQBjhGe9zRA2cYb7poRffMx9nUnNdgfqRCsN9BR5e/QrA4RnuU9AAcba5oRXf8bDY1d9Sw5mEBcrA4ex46ugZLG8Qx2qNKD9BMTyt64meyqbnnDaYSEpQEuo4EOEZ71NJD5+PHm+NprZ7E6czK/AsG8+53kGGR2VXdWSo9rc0VHsourwQSU8dWWF7MRG/8o9zt+UHBvKdCsMisyKzK7jB3Ma3NMfkZJfRJnhYHIhOORRbCFT3JU9nU/KDB9PC760iADIsMr/wOcw/T9jnCH1JCnysS4eBM6NB1LYVr9SY+yKYWfIKxs0KwyLDlsB4yvDKGr8m0fc6fTgAhr3OcZP9t7EhSC+H2uhPv5zMLfqGtJFhVDINxWoxTV8bt7xc96HOGj1OAs8Bxrung4SsbEW6vJz6ST//tF4yd760LFhkWGVYZw5Yc3LpeHhintbkv2qkknaOU+qcnBi41IlzRGx/OpW/4hbadJ5FhMe6sRdy9bpy2z/XjU0BJgBJyYjo0cEGNcGXB5jNLPl7YMYxx2LJgkeE3yvCK4rTisxf38bwUpgROR0P2T5UIVxZsIXPTxwnbVwWLDIu5A1rlksRD1glZg3UTZvrck4+CRC8BkO+j4/aRBwlXztYq5Jd8HL9tBBm2/HCADK8Vw8dC3cpEK4tUPBjYxZtMkxTIL9Hxy68BDEu1xCt6ElQq5vzIsMiwWjBsdS5KTKmnLYvzCXt4xzYDCVKgN4Tdu4YiX/Tnq4UrixYk4sS4o7K440YZb6v9fiF2SrmnrRCucbuBnKdALkfHD5+pJdqilHdqxTCYT4u5CZV3IsVMew8GHB3l9//1GBeJ1Pa0i39+5dSKYarjdDi+O2651eyhimmVRA1W2deToLKnxXxYZNpNwbSKhetKOpBpkWlZ5Ec3xLRKhNvjmnYg02KNG4sav8aZto5y94pvOpBpG3tb32qMqva8TJhW1rPsaZFpkWmRabGGDGvoZkdBUe6BEoat/gaZFnMNmN1pWFXjItNirgGrOw2zvgfItMprnrDPg7oawbr5tI2gweoDA8Zp1xqNYP6s1rkRyLTYK6z1eqWxYFr5GRdzD5BpW4ppMfdAHaMh06qzFxOmxXzaUntSzL1gk3vBhGnLnpZZnA77IGztPgjItFjDpfbtv9nfM4nTtjLTUi6/SED4HAB6Gw334e/YW0DzTuCtyrRFmrnJ88a3gMD1WMDyCnvT4wobsUDdEnI1k7ck00q5FCeQIwQM1p23/jk0NfVMQc2Z8Vv9LaC5aFsqTkvTeQK0ixfa3yBS9kA0aPt3rWxoCAC+0eHf8W1szPKizmvqcCx2SzDBg1apEZO4LC1klkibac+XHAdPR3+w/CGbep/nWjcH/FUAaGdn+tWZk4ZCuj8y0Z/WcU3GR2I/PRPRtkrfg/9uzyybH7JdAEp9sWDPz7K59zuutueE9l8JgIWx+dO8RA/8HupJ6Lgm4yPpMz0b0eqzd21WIfBqLGC506PM6o1/TSl5SZvJ7z8LpeTla8Huc/IXeq3J+kx6zS+L9n/WwgSikJ3FVwAAAABJRU5ErkJggg==)
            no-repeat;
          background-position: 0;
          cursor: pointer;
          .naviIcon {
            width: 24px;
            height: 24px;
            margin: 24px 0 24px 34px;
          }
          .left_arrow,
          .right_arrow {
            top: 50%;
            transform: translateY(-50%);
          }
          .left_arrow {
            position: absolute;
            left: 144px;
          }
          .right_arrow {
            position: absolute;
            left: 68px;
          }
          span {
            font-size: 14px;
            line-height: 69px;
            left: 80px;
            position: absolute;
          }
          .focusArrow {
            position: absolute;
            top: 30px;
            right: 47px;
            width: 11px;
            height: 14px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAAoElEQVQokYXSPQ5BURRF4e+KaI2DxgREYQYGQUQYAyaBUYgpEGoqMQF6rcJTvHcT8fPuKk/W2dnJOaH7zNYY4yZBBT2cMURIyVDHEjs0UnKkjROmqKVkhTTDsVgulSNNbLEoagrdZ5aVLESumJQlvxMQUnKGVVFpXS0RL+hjHwe/kh+Yo/UuwmfyAQP5Rb+IyXeM0PknxuSN/JGu/+vnvABMjh4UaTB7TwAAAABJRU5ErkJggg==);
            background-repeat: no-repeat;
            background-position: top;
            background-size: contain;
          }
        }
        .itemFocused {
          background: url("./components/assets/imgs/itemClickedBackground.png")
            no-repeat;
        }
      }
    }
    .mainContent {
      width: 80%;
      height: 100%;
      max-height: 850px;
      background: rgba(0, 14, 56, 0.6);
      position: relative;
      &::before {
        position: absolute;
        top: 0;
        left: -6px;
        width: 14px;
        height: 100%;
        background: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        background-size: contain;
        transform: rotate(0deg);
        content: " ";
      }
      &::after {
        position: absolute;
        top: 0;
        right: -8px;
        width: 14px;
        height: 100%;
        background: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        background-size: contain;
        transform: rotate(0);
        content: " ";
      }
    }
  }
}
.layout {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background: #0e1631 url(../../assets/img/space_home.png) no-repeat 0 0;
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