<template>
    <div class="dsqy">
      <!-- <el-scrollbar style="height: 100%"> -->
        <div class="cont">
            <ul class="">
                <div class="label">
                    <span class="tit">{{ labelTitle.tit }}</span>
                    <span class="num">{{ labelTitle.num }}</span>
                </div>
                <li v-for="(item, index) in list" :key="index">
                    <span class="tit">{{ item.main }}</span>
                    <span class="num">{{ item.num }}</span>
                </li>
            </ul>
        </div>
        <!-- </el-scrollbar> -->
    </div>
</template>

<script>
import { apiGetDsqyData } from "@/api/portal-requst";
export default {
    data() {
        return {
            labelTitle: {
                tit: "重大事件",
                num: "今日情报",
            },
            list: [],
        };
    },
    props: [],
    methods: {
        getDSQY() {
          apiGetDsqyData().then((res) => {
            // eslint-disable-next-line no-console
          console.log(res);
                if (res.code == 200) {
                    this.list = res.data.slice(0,3);;
                } else {
                    this.$message(res.message);
                }
            });
        },
    },
    mounted() {
        this.getDSQY();
    },
};
</script>

<style lang="less" scoped>
// @import '../../../assets/css/portal-content';
.dsqy {
  height:185px;
  overflow:hidden;
}
</style>
<style>

.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>