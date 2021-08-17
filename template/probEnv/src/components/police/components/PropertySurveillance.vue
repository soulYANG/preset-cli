<template>
  <div class="moduleWrapper" style="width: 1009px; margin-left: 10px">
    <div class="moduleHeader">
      <span class="title">警情监测</span>
    </div>
    <div class="mainContent">
      <div class="ContentLeft">
        <div class="sub_title">
          <span>性质监测</span>
        </div>
        <div class="content">
          <div class="illegal" v-if="monitorList && monitorList.length >= 1">
            <div style="color: #fa4008">{{ monitorList[0].original }}</div>
            <div class="downArrow"></div>
            <div style="color: #1491fa">{{ monitorList[0].target }}</div>
            <div style="margin-top: 48px">
              <span class="count">{{ monitorList[0].quantity }}</span>
              <span class="countSuf">件</span>
              <span class="perCount"
                >{{ monitorList[0].percent
                }}<img
                  v-if="monitorList[0].trend === '0'"
                  src="./assets/imgs/down.png" /><img
                  v-if="monitorList[0].trend === '1'"
                  src="./assets/imgs/raiseUp.png"
              /></span>
            </div>
          </div>
          <div class="legal" v-if="monitorList && monitorList.length >= 2">
            <div style="color: #1491fa">{{ monitorList[1].original }}</div>
            <div class="downArrow"></div>
            <div style="color: #92ef43">{{ monitorList[1].target }}</div>
            <div style="margin-top: 48px">
              <span class="count">{{ monitorList[1].quantity }}</span
              ><span class="countSuf">件</span>
              <span class="perCount"
                >{{ monitorList[1].percent
                }}<img
                  v-if="monitorList[1].trend === '0'"
                  src="./assets/imgs/down.png" /><img
                  v-if="monitorList[1].trend === '1'"
                  src="./assets/imgs/raiseUp.png"
              /></span>
            </div>
          </div>
        </div>
      </div>
      <div class="ContentRight">
        <div class="sub_title" style="display: flex">
          <span>警情趋势</span>
          <div
            :class="isMonthCheck ? 'check_btn' : 'uncheck_btn'"
            @click="queryMonthly"
          >
            月度
          </div>
          <div
            :class="isYearCheck ? 'check_btn' : 'uncheck_btn'"
            @click="queryYearly"
          >
            年度
          </div>
          <div
            class="exportOption"
            @click="excelOut('/minor/policeJugment/exportPoliceTrend')"
            style="position: absolute; right: 20px; z-index: 5"
          >
            <img src="./assets/imgs/export.png" alt="" class="export" />
          </div>
        </div>
        <div class="main">
          <v-chart class="hotwordsChart" :option="option" ref="mychart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPoliceMonitorInfo,
  queryMonthly,
  queryYearly,
} from "@/api/police-request";
import { baseUrl } from "@/utils/http";
import { excelOut } from "@/utils/tool";
const queryYear = new Date().getFullYear();
const queryMonth = new Date().getMonth() + 1;
export default {
  data() {
    return {
      option: {},
      isMonthCheck: true,
      isYearCheck: false,
      monitorList: [],
    };
  },
  created() {
    this.queryMonthly();
  },

  methods: {
    getPoliceMonitorInfo() {
      getPoliceMonitorInfo().then((res) => {
        this.monitorList = res.data.data;
      });
    },
    queryMonthly() {
      this.isMonthCheck = true;
      this.isYearCheck = false;
      if (this.$refs.mychart) {
        this.$refs.mychart.clear();
      }
      queryMonthly({ year: queryYear, month: queryMonth }).then((res) => {
        let monthly = res.data.data;
        let days = [];
        let belongs = [];
        monthly.forEach((month) => {
          month.name = month.belong;
          belongs.push(month.belong);
          month.data = Object.values(month.dayNumber);
          month.type = "line";
          days = Object.keys(month.dayNumber);
        });

        this.option = {
          xAxis: {
            type: "category",
            data: days.map((day) => {
              return queryMonth + "." + day;
            }),
            axisLabel: {
              textStyle: {
                color: "rgba(82,179,255,0.6)",
              },
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "rgba(82,179,255,0.2)",
                width: "1",
              },
            },
          },
          yAxis: {
            type: "value",
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
          series: monthly,
          tooltip: {
            trigger: "axis",
          },
          legend: {
            top: 20,
            right: 60,
            type: "scroll",
            width: 350,
            data: belongs,
            textStyle: { color: "#a7d8ff" },
            pageTextStyle: { color: "#a7d8ff" },
          },
        };
      });
    },
    queryYearly() {
      this.isMonthCheck = false;
      this.isYearCheck = true;
      if (this.$refs.mychart) {
        this.$refs.mychart.clear();
      }

      queryYearly({ year: queryYear }).then((res) => {
        let monthly = res.data.data;
        let months = [];
        let belongs = [];
        monthly.forEach((month) => {
          month.name = month.belong;
          belongs.push(month.belong);
          month.data = Object.values(month.monthNumber);
          month.type = "line";
          months = Object.keys(month.monthNumber);
        });

        this.option = {
          xAxis: {
            type: "category",
            data: months.map((month) => {
              return month + "月";
            }),
            axisLabel: {
              textStyle: {
                color: "rgba(82,179,255,0.6)",
              },
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "rgba(82,179,255,0.2)",
                width: "1",
              },
            },
          },
          yAxis: {
            type: "value",
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
          series: monthly,
          tooltip: {
            trigger: "axis",
          },
          legend: {
            top: 20,
            right: 60,
            type: "scroll",
            width: 350,
            data: belongs,
            textStyle: { color: "#a7d8ff" },
            pageTextStyle: { color: "#a7d8ff" },
          },
        };
      });
    },
    excelOut(url) {
      excelOut(baseUrl + url);
    },
  },
  mounted() {
    this.getPoliceMonitorInfo();
  },
};
</script>

<style lang="less" scoped>
@import "./assets/less/layout.less";
.moduleWrapper {
  background: url("./assets/imgs/hotwordsBg2.png") no-repeat;
  background-size: 100%;

  .ContentLeft {
    overflow: hidden;

    .content {
      display: flex;
      margin-top: 80px;
    }
    .illegal,
    .legal {
      position: relative;
      width: 50%;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
      // margin-top: 50px;
      .downArrow {
        width: 100%;
        height: 26px;
        background: url("./assets/imgs/transform.png") no-repeat center;
      }
    }
    .illegal div,
    .legal div {
      margin-top: 15px;
    }
    .illegal .count,
    .legal .count {
      margin-top: 15px;
      font-size: 30px;
    }
    .illegal .countSuf,
    .legal .countSuf {
      margin-top: 15px;
      font-size: 18px;
    }

    .illegal .perCount,
    .legal .perCount {
      margin-top: 15px;
      margin-left: 12px;
      font-size: 20px;
    }
    // .illegal::after {
    //   display: block;
    //   content: "";
    //   width: 2px;
    //   height: 100px;
    //   background: rgb(238, 238, 238);
    //   position: absolute;
    //   right: 0;
    //   top: 25px;
    // }
  }
}
</style>