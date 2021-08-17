<template>
    <div class="calendar">
        <div class="tit"><i class="icon"></i>风险日历</div>
        <el-calendar v-model="calendar">
            <template slot="dateCell" slot-scope="{ date, data }">
                <div>
                    <span>{{ data.day | formatDay }}</span>
                    <span v-if="keyDay(date, data)" class="key"></span>
                </div>
            </template>
        </el-calendar>
        <div class="carouselList" v-if="list.length">
            <VueSlickCarousel v-bind="carouselSettings" :style="{height:'60px'}">
                <div
                    class="carouselItem"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <span class="t">{{ item.title }}</span>
                    <span
                        class="time"
                        v-html="formatDate(item.beginDate, item.endDate)"
                    ></span>
                </div>
            </VueSlickCarousel>
            <!-- <li v-for="(item, index) in list" :key="index">
                <span class="t">{{ item.title }}</span>
                <span
                    class="time"
                    v-html="formatDate(item.beginDate, item.endDate)"
                ></span>
            </li> -->
        </div>
    </div>
</template>

<script>
import { apiGetQueryRiskCalendar } from "@/api/portal-requst";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
    data() {
        return {
            list: [],
            calendar: new Date(),
            holidayList: [],
            carouselSettings:{
                vertical:true,
                autoplay:true,
                slidesToShow:2,
                slidesToScroll:1,
                verticalSwiping:true,
                infinite:true,
                arrows:false
            }
        };
    },
    props: [],
    components: { VueSlickCarousel },
    filters: {
        formatDay(day) {
            return day.split("-")[2] < 10
                ? day.split("-")[2].substr(1, 1)
                : day.split("-")[2];
        },
    },
    methods: {
        keyDay(date, data) {
            return this.holidayList.some((item, index) => item == data.day);
        },
        formatDate(beginDate, endDate) {
            let tpl = "";
            if (beginDate == endDate) {
                tpl = this.$moment(beginDate).format("M月D日");
            } else {
                tpl =
                    this.$moment(beginDate).format("M月D日") +
                    (endDate
                        ? "-" + this.$moment(endDate).format("M月D日")
                        : "");
            }
            return tpl;
        },
        getHolidayList() {
            let newList = [];
            this.list.map((item, index) => {
                newList = newList.concat(
                    this.getEveryDayDateByBetweenDate(
                        item.beginDate,
                        item.endDate
                    )
                );
            });
            this.holidayList = newList;
        },
        getEveryDayDateByBetweenDate(start_date, end_date) {
            var dateList = [this.$moment(start_date).format("YYYY-MM-DD")];
            if (start_date == end_date) return dateList;
            var i = 1;
            while (true) {
                var dateTime = new Date(dateList[i - 1]);
                dateTime = dateTime.setDate(dateTime.getDate() + 1);
                var date = this.$moment(new Date(dateTime)).format(
                    "YYYY-MM-DD"
                );
                dateList.push(date);
                if (date == end_date) {
                    break;
                }
                i++;
            }
            return dateList;
        },
    },
    mounted() {
        this.$nextTick(() => {
            let month = this.$moment(new Date()).format("YYYYMM");
            apiGetQueryRiskCalendar({ month: month }).then((res) => {
                if (res.code == 200) {
                    this.list = res.data;
                    this.getHolidayList();
                } else {
                    this.$message(res.message);
                }
            });
        });
    },
};
</script>
<style lang="less" scoped>
.calendar {
    width: 343px;
    min-height: 100px;
    border: 1px solid rgba(33, 77, 158, 0.4);
    background: rgba(7, 15, 42, 0.4);
    position: absolute;
    top: 50.34%;
    right: 40px;
    padding-bottom: 5px;
    .tit {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-left: 14px;
        padding: 16px 0;
        display: flex;
        align-items: center;
        .icon {
            width: 7px;
            height: 10px;
            background: url(../../../assets/img/portal/arrow-right.png)
                no-repeat 0 0;
            display: inline-block;
            margin-right: 4px;
        }
    }
    .carouselList {
        .carouselItem {
            height: 18px;
            background: rgba(255, 0, 0, 0.4);
            opacity: 0.8;
            border: 1px solid rgba(255, 0, 0, 0.5);
            .t,
            .time {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(235, 241, 255, 1);
                height: 18px;
                line-height: 18px;
                display: inline-block;
                overflow: hidden;
            }
            .t {
                padding-left: 4%;
                width: 60%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .time {
                padding-left: 3%;
                padding-right: 3%;
                width: 30%;
                text-align: right;
            }
        }
    }
    /deep/ .slick-slider {
        .slick-list {
            .slick-slide > div {
                padding:0 14px 10px 14px;
            }
        }
    }
    /deep/ .el-calendar {
        background: rgba(7, 15, 42, 0.4);
        .el-calendar__header {
            display: none;
        }
        .el-calendar__body {
            padding: 0 15px 10px 15px;
        }
        .el-calendar-table {
            .el-calendar-day {
                height: auto;
                text-align: center;
                padding: 5px;
            }
            thead {
                th {
                    font-size: 14px;
                    padding: 5px 0;
                    color: #fff;
                    opacity: 0.8;
                }
            }
            td {
                border-color: rgba(33, 77, 158, 0.4);
                border: none;
                color: #606266;
            }
            td.is-selected {
                background: rgba(33, 77, 158, 0.6);
            }
            td:hover {
                .el-calendar-day {
                    background: rgba(33, 77, 158, 0.6);
                }
            }
        }
        .el-calendar-table:not(.is-range) td.next,
        .el-calendar-table:not(.is-range) td.prev {
            // color:#fff;
        }
        .el-calendar-table .current .el-calendar-day {
            position: relative;
            color: #fff;
        }
        .el-calendar-table .current .el-calendar-day .key {
            position: absolute;
            right: 3px;
            top: 7px;
            font-weight: 700;
            width:5px;
            height:5px;
            background:#ff0000;
            -webkit-border-radius:5px;
            border-radius:5px;
        }
        .el-backtop,
        .el-calendar-table td.is-today {
            color: #409eff;
        }
    }
}
</style>