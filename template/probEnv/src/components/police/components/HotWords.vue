<template>
  <div class="moduleWrapper" style="width: 849px">
    <div class="moduleHeader">
      <span class="title">警情热词</span>
      <span class="settings" @click="toggleSettingsPage">设置</span>
    </div>
    <div class="mainContent">
      <div class="ContentLeft" style="width: 45%">
        <div class="sub_title">
          <span>词云</span>
          <span
            class="exportOption"
            @click="excelOut('/minor/policeJugment/exportPoliceKeyword')"
            ><img src="./assets/imgs/export.png" alt="" class="export" />
          </span>
        </div>
        <div class="tag-box">
          <!-- <div class="tags" v-for="(item, index) in hotwordsList" :key="index">
            <a>{{ item }}</a>
          </div> -->
          <div
            class="tags"
            v-for="(item, index) in hotwordsList_copy"
            :key="index"
          >
            <a
              :style="{
                color: colors[Math.round((item.heat / maxCount) * 15)],
              }"
              :class="{
                danger: item.heat >= 0.8,
                warning: item.heat >= 0.6 && item.heat < 0.8,
              }"
              >{{ item.keyword }}</a
            >
          </div>
        </div>
      </div>
      <div class="ContentRight" style="width: 55%">
        <div class="sub_title" style="z-index: 10">
          <span>趋势</span>
          <span
            class="exportOption"
            @click="excelOut('/minor/policeJugment/exportPoliceKeywordHeat')"
            ><img src="./assets/imgs/export.png" alt="" class="export" />
          </span>
        </div>
        <div class="main">
          <v-chart class="hotwordsChart" :option="option" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wordcloud from "./assets/js/wordCloud";
import { getWordCloud, getWordCloudInfo } from "@/api/police-request";
import { excelOut } from "@/utils/tool";
import { baseUrl } from "@/utils/http";
export default {
  data() {
    return {
      hotwordsList: [],
      hotwordsList_copy: [],
      maxCount: 0,
      option: {},
      colors: [
        ...Array(10).fill("#68b6ff"),
        ...Array(3).fill("yellow"),
        ...Array(2).fill("orange"),
        ...Array(1).fill("red"),
      ],
    };
  },
  created() {},
  methods: {
    toggleSettingsPage() {
      this.$router.push("/settings");
    },
    getWordCloud() {
      getWordCloud().then((res) => {
        this.hotwordsList = res.data.data;
        this.$nextTick(() => {
          wordcloud.start();
        });
      });
    },
    getWordCloudInfo() {
      getWordCloudInfo().then((res) => {
        let hotWords = [];
        let datas = [];
        console.log(res.data.data);
        this.hotwordsList_copy = res.data.data;
        res.data.data.forEach((r) => {
          hotWords.push(r.keyword);
          datas.push(r.heat);
        });
        this.maxCount = Math.max(...datas);
        console.log(this.maxCount);
        this.option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            containLabel: true,
          },
          yAxis: {
            type: "value",
            show: true,
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "rgba(82,179,255,0.2)",
                width: "1",
              },
            },
            splitLine: {
              //网格线
              show: true,
              color: "#52b3ff",
              lineStyle: {
                // 使用深浅的间隔色
                color: ["rgba(82,179,255,0.2)"],
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(82,179,255,0.6)",
              },
            },
          },
          xAxis: {
            type: "category",
            data: hotWords,
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "rgba(82,179,255,0.2)", //左边线的颜色
                width: "1", //坐标线的宽度
              },
            },
            splitLine: {
              //网格线
              show: false,
              lineStyle: {
                // 使用深浅的间隔色
                color: ["rgba(82,179,255,0.5)"],
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(82,179,255,0.6)",
              },
              interval:0,
              rotate:60
            },
          },

          series: [
            {
              name: "2021年",
              type: "bar",
              data: datas,
              barWidth: "15",
              label: {
                distance: 1,
              },
              itemStyle: {
                normal: {
                  color: "#42dbd9",
                },
              },
            },
          ],
        };
        this.$nextTick(() => {
          wordcloud.start();
        });
      });
    },
    excelOut(url) {
      excelOut(baseUrl + url);
    },
  },
  mounted() {
    this.getWordCloud();
    this.getWordCloudInfo();
  },
  destroyed() {
    this.$nextTick(() => {
      wordcloud.stop();
    });
  },
};
</script>

<style lang="less" scoped>
@import "./assets/less/layout.less";

@import "./assets/less/wordCloud.less";

.moduleWrapper {
  background: url("./assets/imgs/hotwordsBg1.png") no-repeat;
  background-size: 100%;
}
</style>