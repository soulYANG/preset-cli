<template>
  <div class="detailsPopover" v-if="isShowDetailsPop">
    <div class="wrap">
      <div class="inner">
        <div class="title">康得新再诉北银能否重得122亿？</div>
        <div class="line-block">
          <div class="from">发布来源：姑苏分局</div>
          <div class="number">网阅读量：100</div>
          <div class="time">2019/10/8   16：43：30</div>
        </div>
        <div class="contents">
          <p>近日，* ST康得（3.520，0.00，0.00％）（维权）发布公告，称对北京银行（4.870，-0.02，-0.41％）股份有限公司，北京银行股份有限公司西单支行已再次提起诉讼，经北京二中院审查，符合法定起诉条件，已登记立案。</p>
          <p>2014年，康德集团与北京银行西单支行几年了一份《现金管理服务协议》，对康德集团下属公司在该行设立的账户进行统一的归集管理。即子公司的账户资金都自动归集到母公司账户下，如果需要对外付款，则由母公司账户下拨后支付。</p>
          <p>康德集团作为康得新的大股东，也将康康新及其合并财务报表范围内3家子公司的5个银行帐户资金实时归集到康得集团。</p>
          <p>根据* ST康得2018年年报，报告期末公司货币资金122亿卢布在北京银行西单支行。但会计师出具了无法表示意见的审计报告，表示无法保证* ST康得货币资金的真实准确，并在对深交所问询函的回复中称网银记录显示的货币资金余额与上市公司财务记录一致，同时该账户在北京银行有联动账户业务。</p>
        </div>
      </div>
      <div class="close-btn" @click="hideWindow"><i class="el-icon-close"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props:['isShowDetailsPop'],
  components:{

  },
  methods:{
    hideWindow(){
      this.$emit('update:isShowDetailsPop', false);
    }
  },
  mounted() {
    this.$nextTick(() => {

    });
  }
}
</script>

<style lang="less" scoped>
.detailsPopover{
  position: fixed;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.8);
  top:0;
  left:0;
  z-index:20;
  .wrap{
    width:74.3%;
    height:80vh;
    top:50%;
    margin:-40vh auto 0 auto;
    position: relative;
    background:url('../../../assets/img/portal/detailsWinowBg.png') no-repeat center center;
    background-size:100% 100%;
    .inner{
      padding:72px;
      .title{
        text-align: center;
        font-size:34px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin-bottom:49px;
      }
      .line-block{
        border-bottom:1px solid rgb(40, 71, 65,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size:18px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        div{
          padding-bottom:6px;
        }
      }
      .contents{
        margin-top:29px;
        color:#fff;
        font-size:18px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(132,181,250,1);
        line-height:24px;
        text-align: justify;
        p{
          margin-bottom:19px;
        }
      }
    }
    .close-btn{
      width:32px;
      height:32px;
      color:#66CEFF;
      position: absolute;
      top:50px;
      right:60px;
      font-size:32px;
      cursor: pointer;
    }
  }
}
</style>