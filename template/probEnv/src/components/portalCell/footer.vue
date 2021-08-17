<template>
    <div class="footer">
        <div class="foot">
            <ul class="nav-list">
                <li v-for="(item, index) in list" :key="index" :class="{ middle: index == Math.ceil(list.length / 2) - 1 }">
                    <span v-if="item.name !== '情报纵横'" @click="goto(item.url)">{{ item.name }}</span>
                    <el-dropdown v-else @command="handleSubMenu">
                        <span>{{ item.name }}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="subMenu in subMenu" :key="subMenu.name" :command="subMenu.url">{{ subMenu.name }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
            <div class="prev" :class="{ pointer: isPrev }" @click="prevFun()"></div>
            <div class="next" :class="{ pointer: isNext }" @click="nextFun()"></div>
        </div>
    </div>
</template>
<script>
import { apiGetQueryApplicationUrl } from "../../api/portal-requst";
export default {
    data() {
        return {
            list: [],
            sliderNum: 7,
            marginLeft: 191,
            num: 0,
            isPrev: false,
            isNext: true,
            subMenu: [
                {
                    name: "部级情报",
                    url: "http://10.160.26.133:8080/gongan/admin/user/homeIndex.do",
                },
                {
                    name: "省级情报",
                    url: "https://stqbpt.zhzx.js:8443/qbpt/qbpt/code/mainUI.xhtml",
                },
                {
                    name: "猎眼系统",
                    url: "http://50.73.66.30:8080/ythgkpt/sys/global/ModuleSuccess.xhtml?moduleSign=zdmbfxk&titleIoc=zhzzpt_title.gif",
                },
                {
                    name: "合成维稳",
                    url: "http://hcwbpt.zh.szh.js:9080/zdmbfxk/",
                },
                {
                    name: "情报研判",
                    url: "http://50.79.80.42:8011/kfpt1/loginController.do?login&dllx=hplus",
                },
                {
                    name: "犯罪预测",
                    url: "http://10.35.183.223/",
                },
                {
                    name: "联合指挥",
                    url: "http://50.73.67.171:8080/szgalhzhSystem",
                },
            ],
        };
    },
    props: [],
    methods: {
        handleSubMenu(command) {
          console.log(111)
          window.open(command)
        },
        goto(url) {
            window.location.href = url;
        },
        prevFun() {
            if (!this.isPrev) {
                return;
            }
            this.num--;
            if (this.num >= 0) {
                document.querySelectorAll(".nav-list li")[0].style.marginLeft = -this.marginLeft * this.num + "px";
                if (this.num == 0) {
                    this.isNext = true;
                    this.isPrev = false;
                }
            }
        },
        // nextFun(){
        //   if(!this.isNext){
        //     return;
        //   }
        //   this.num++;
        //   if(this.num<=this.list.length-this.sliderNum){
        //     document.querySelectorAll('.nav-list li')[0].style.marginLeft = -this.marginLeft*this.num+'px';
        //     if(this.num==this.list.length-this.sliderNum){
        //       this.isNext = false;
        //       this.isPrev = true;
        //     }
        //   }
        // }
        nextFun() {
            if (!this.isNext) {
                return;
            }
            this.num++;
            if (this.num <= this.list.length - this.sliderNum) {
                document.querySelectorAll(".nav-list li")[0].style.marginLeft = -this.marginLeft * this.num + "px";
                this.isPrev = true;
                if (this.num == this.list.length - this.sliderNum) {
                    this.isNext = false;
                }
            }
        },
    },
    mounted() {
        this.$nextTick(() => {
            apiGetQueryApplicationUrl({}).then((res) => {
                if (res.code == 200) {
                    this.list = res.data;
                    if (this.list.length > this.sliderNum) {
                        this.isNext = true;
                    }
                } else {
                    this.$message(res.message);
                }
            });
        });
    },
};
</script>
<style lang="less" scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 18px;
    width: 100%;
    .foot {
        height: 56px;
        line-height: 56px;
        overflow: hidden;
        display: flex;
        width: 100%;
        .prev {
            background: url(../../assets/img/portal/prev-bg.png) no-repeat 0 0;
            height: 56px;
            width: 264px;
            position: absolute;
            left: 0;
            bottom: 0;
            cursor: default;
        }
        .next {
            background: url(../../assets/img/portal/prev-bg.png) no-repeat 0 0;
            height: 56px;
            width: 264px;
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
            position: absolute;
            right: 0;
            bottom: 0;
            cursor: default;
        }
        .pointer {
            cursor: pointer;
        }
        .nav-list {
            width: 70%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0 auto;
            li {
                width: 186px;
                height: 56px;
                line-height: 50px;
                text-align: center;
                color: #fff;
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 400;
                background: url(../../assets/img/portal/foot-btn-bg.png) no-repeat 0 0;
                margin-right: 6px;
                cursor: pointer;
                flex: none;
                /* 新增下级菜单 */
                /deep/ .el-dropdown {
                    color: inherit;
                    font-size: inherit;
                }
            }
            li.middle {
                background: url(../../assets/img/portal/foot-btn-center-bg.png) no-repeat 0 0;
            }
        }
    }
}
/* 新增下级菜单 */
.el-dropdown-menu {
    border-color: #028be2;
    background-color: #028be2;
    .el-dropdown-menu__item {
        color: #fff;
        background-color: #028be2;
    }
    .el-popper .popper__arrow {
        background-color: #028be2;
        -webkit-filter: drop-shadow(0 2px 12px rgba(2, 139, 226, 0.03));
        filter: drop-shadow(0 2px 12px rgba(2, 139, 226, 0.03));
    }
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color:#fff;
      color:#028be2;
    }
}
</style>
