<template>
    <div class="header">
        <div
            class="topic"
            :class="[statusHeader.title == '常态模式' ? 'normal' : 'hot']"
        >
            <span class="t">{{ statusHeader.title }}</span>
            <span class="time">{{ timeStr }}</span>
        </div>
        <div class="user-layout">
            <span class="name">当前登录 {{ xtyhbmbm }} {{ getUserName }}</span>
            <span class="user" @click="openUser"></span>
            <span class="logout" @click="logout"></span>
        </div>
        <div v-show="userDialog" class="userDialog">
            <div class="overlay">
                <div class="userInfo" :class="{ show: showDialog == true }">
                    <div class="close" @click="close"></div>
                    <div class="title">个人信息</div>
                    <div class="infoCon">
                        <div class="head">
                            <img src="../../assets/img/portal/user.png" />
                            <div class="name">{{ getUserName }}</div>
                        </div>
                        <div class="infoBox">
                            <div>
                                <ul>
                                    <li>
                                        <label>警号：</label>
                                        <span>{{ userInfo.jinghao }}</span>
                                    </li>
                                    <li>
                                        <label>短号：</label>
                                        <span>{{ userInfo.duanhao }}</span>
                                    </li>
                                    <li>
                                        <label>手机：</label>
                                        <span>{{ userInfo.yddh }}</span>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <label>身份证号：</label>
                                        <span>{{ userInfo.sfzh }}</span>
                                    </li>
                                    <li>
                                        <label>部门名称：</label>
                                        <span>{{
                                            userInfo.deptment &&
                                            userInfo.deptment.xtyhbmmc
                                        }}</span>
                                    </li>
                                    <li>
                                        <label>办公地点：</label>
                                        <span v-if="userInfo.bgdd != 'null'">{{
                                            userInfo.bgdd
                                        }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { apiGetCurrentUser, apiGetTopic } from "../../api/portal-requst";
import { mapGetters } from "vuex";
import { authUrl, baseUrl, callBackUrl, webSiteUrl } from "../../utils/http";
export default {
    data() {
        return {
            statusHeader: {},
            timeStr: "",
            xtyhbmbm: "",
            userInfo: {},
            userDialog: false,
            showDialog: false,
        };
    },
    props: ["args"],
    methods: {
        openUser() {
            this.userDialog = !this.userDialog;
            setTimeout(() => {
                this.showDialog = !this.showDialog;
            }, 0);
        },
        logout() {
            window.location.href = `${authUrl}/logout?service=${authUrl}/login?service=${baseUrl}/minor/single/gotoUrl?url=${callBackUrl}/${webSiteUrl}`;
        },
        close() {
            this.userDialog = !this.userDialog;
            this.showDialog = !this.showDialog;
        },
        getTime() {
            // clearInterval(timer);
            // const timer = setInterval(()=>{
            //   if(!this.statusHeader.beginDate && !this.statusHeader.endDate){
            //     this.timeStr = this.$moment().format('MM月DD日 HH时mm分');
            //   }else{
            //     this.timeStr = this.$moment(this.statusHeader.beginDate).format('MM月DD日') + (this.statusHeader.endDate ? '-' + this.$moment(this.statusHeader.endDate).format('MM月DD日') : '');
            //   }
            // },1000);
            this.timeStr = this.$moment(new Date().getTime()).format(
                "YYYY年MM月DD日"
            );
        },
    },
    computed: {
        ...mapGetters(["getUserName"]),
    },
    mounted() {
        this.$nextTick(() => {
            apiGetCurrentUser({}).then((res) => {
                if (res.code == 200) {
                    this.$store.dispatch("setUserName", res.data.xm);
                    this.xtyhbmbm = res.data.deptment.xtyhbmbm;
                    this.userInfo = res.data;
                } else {
                    this.$message(res.message);
                }
            });
            apiGetTopic({}).then((res) => {
                if (res.code == 200) {
                    this.statusHeader = res.data;
                } else {
                    this.$message(res.message);
                }
                this.getTime();
            });
        });
    },
};
</script>
<style lang="less" scoped>
.userDialog {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 99;
    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(5, 13, 28, 0.8);
    }
    .userInfo {
        position: absolute;
        right: 100px;
        top: 100px;
        width: 630px;
        height: 520px;
        background: rgba(24, 43, 90, 0.7);
        -webkit-box-shadow: 0 0 20px inset rgba(48, 145, 255, 0.35);
        box-shadow: 0 0 20px inset rgba(48, 145, 255, 0.35);
        -webkit-border-radius: 10px;
        border-radius: 10px;
        z-index: 999;
        -webkit-transition: all 0.35s;
        transition: all 0.35s;
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
        -webkit-transform-origin: 100% 0 0;
        transform-origin: 100% 0 0;
        &.show {
            -webkit-transform: scale(1);
            transform: scale(1);
            right: 50%;
            top: 50%;
            margin-right: -315px;
            margin-top: -260px;
        }
        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 15px;
            height: 15px;
            cursor: pointer;
            background: url(../../assets/img/portal/close.png) no-repeat;
        }
        .title {
            padding: 20px 0 0 20px;
            font-size: 16px;
            color: #fff;
        }
        .infoCon {
            .head {
                margin: 40px auto 0;
                display: flex;
                width: 110px;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .name {
                    margin-top: 10px;
                    font-size: 22px;
                    color: #30c2ff;
                }
            }
            .infoBox {
                margin: 50px auto 0;
                display: flex;
                width: 100%;
                justify-content: center;
                align-items: center;
                ul {
                    margin-bottom: 10px;
                    li {
                        line-height: 30px;
                        label {
                            display: inline-block;
                            width: 100px;
                            font-size: 16px;
                            color: #a5a5a5;
                            text-align-last: justify;
                        }
                        span {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}
.header {
    background: url(../../assets/img/portal/logo.png) no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    height: 129px;
    .topic {
        height: 42px;
        width: 388px;
        position: absolute;
        top: 24px;
        left: 30px;
        line-height: 38px;
        .t {
            color: #fff;
            font-size: 19px;
            padding: 0 80px;
        }
        .time {
            color: #fff;
            font-size: 14px;
        }
    }
    .hot {
        background: url(../../assets/img/portal/hot-bg.png) no-repeat 0 0;
        background-size: 100% 100%;
    }
    .normal {
        background: url(../../assets/img/portal/normal-bg.png) no-repeat 5px 3px;
    }
    .user-layout {
        position: absolute;
        top: 31px;
        right: 33px;
        display: flex;
        .name {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 34px;
            margin-right: 5px;
            display: inline-block;
            padding: 0 15px;
            background: url(../../assets/img/portal/c-btn-bg.png) no-repeat 0 0;
        }
        .user {
            background: url(../../assets/img/portal/user-bg.png) no-repeat 0 0;
            width: 34px;
            height: 34px;
            display: inline-block;
            margin-right: 5px;
            &:hover {
                cursor: pointer;
                background: url(../../assets/img/portal/user-bg-hover.png)
                    no-repeat 0 0;
            }
        }
        .logout {
            background: url(../../assets/img/portal/logout-bg.png) no-repeat 0 0;
            width: 34px;
            height: 34px;
            display: inline-block;
            &:hover {
                cursor: pointer;
                background: url(../../assets/img/portal/logout-bg-hover.png)
                    no-repeat 0 0;
            }
        }
    }
}
</style>