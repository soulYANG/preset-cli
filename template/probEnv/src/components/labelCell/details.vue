<template>
  <div class="table">
    <div class="inner">
      <div class="hder">
        <div class="tit">标签详情</div>
        <div v-if="deleteCurrentTag" class="editor" @click="editorFun">编辑</div>
        <div v-if="deleteCurrentTag" class="dele" @click="deleFun"><i class="el-icon-loading" v-if="isDelLoading"></i>删除</div>
      </div>
      <ul>
        <li>
          <span class="t">标签名称</span>
          <span class="input"><input type="text" v-model="tagDetailsData.name" :disabled="isDisabled" /></span>
        </li>
        <li>
          <span class="t">所属类别</span>
          <span class="input"><input type="text" v-model="tagDetailsData.parentName" disabled /></span>
        </li>
        <li>
          <span class="t">主题专项</span>
          <span class="input"><input type="text" v-model="tagDetailsData.region" :disabled="isDisabled" /></span>
        </li>
        <li>
          <span class="t">标签代码</span>
          <span class="input"><input type="text" v-model="tagDetailsData.code" disabled /></span>
        </li>
        <li>
          <span class="t">映射代码</span>
          <span class="input"><input type="text" v-model="tagDetailsData.mappingCode" :disabled="isDisabled" /></span>
        </li>
        <li>
          <span class="t">标签描述</span>
          <el-input class="txt" type="textarea" v-model="tagDetailsData.description" :disabled="isDisabled" autocomplete="off"></el-input>
        </li>
      </ul>
      <div class="btns">
        <div class="esc" v-if="!isDisabled" @click="escFun">取消</div>
        <div v-if="!isDisabled" class="commit" @click="commitFun"><i class="el-icon-loading" v-if="isEditLoading"></i>提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiUpdateTag,apiDeleteTagById } from '../../api/label-requst'
export default {
  data(){
    return{
      oldObj:{},
      isDisabled:this.isEditor || true,
      isDelLoading: false,
      isEditLoading: false
    }
  },
  props:{
    tagDetailsData:{
      type:Object
    },
    isEditor:{
      type:Boolean
    },
    deleteCurrentTag:{
      type:Boolean
    }
  },
  methods:{
    editorFun(){
      this.isDisabled = false;
      this.oldObj = {
        name:this.tagDetailsData.name,
        parentName:this.tagDetailsData.parentName,
        code:this.tagDetailsData.code,
        mappingCode:this.tagDetailsData.mappingCode,
        id:this.tagDetailsData.id,
        description:this.tagDetailsData.description,
        tagTopicId:this.tagDetailsData.tagTopicId,
        parentId:this.tagDetailsData.parentId
      };
    },
    commitFun(){
      if (this.isEditLoading) {
        // 如果正在提交
        return
      }
      let data = this.tagDetailsData;
      delete data.parentName;
      delete data.children;
      this.isEditLoading = !this.isEditLoading;
      apiUpdateTag(data).then(res => {
        if(res.code==200){
          this.$message('更新成功');
        }else{
          this.$message(res.message);
        }
        this.isEditLoading = !this.isEditLoading;
      });
    },
    deleFun(){
      if (this.isDelLoading) {
        // 如果正在提交
        return
      }
      // 如果当前处于编辑状态，将编辑状态还原初始
      this.isDisabled = true;
      let id = this.tagDetailsData.id;
      this.isDelLoading = !this.isDelLoading;
      apiDeleteTagById({id}).then(res => {
        if(res.code==200){
          this.$message('删除成功');
          this.$emit('deleteSuss',this.deleteCurrentTag);
        }else{
          this.$message(res.message);
        }
        this.isDelLoading = !this.isDelLoading;
      })
    },
    escFun(){
      this.isDisabled = true;
      for (const key in this.oldObj) {
        this.tagDetailsData[key] = this.oldObj[key];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
    });
  }
}
</script>
<style lang="less" scoped>
.table{
  width:100%;
  min-height:100%;
  background:rgba(12,32,66,0.8);
  .inner{
    padding:44px 37px 0 37px;
    .hder{
      position: relative;
    }
    .tit{
      font-size:18px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(216,246,254,1);
      padding-bottom:28px;
      border-bottom:1px solid rgba(34,118,230,0.35);
    }
    .editor{
      font-size:12px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      width:60px;
      height:24px;
      background:linear-gradient(90deg,rgba(42,94,213,1),rgba(11,106,193,1));
      border-radius:1px;
      line-height:24px;
      text-align: center;
      position: absolute;
      right:0;
      top:0px;
      cursor: pointer;
      border-radius: 5px;
    }
    .dele{
      font-size:12px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      width:60px;
      height:24px;
      background:linear-gradient(90deg,rgba(42,94,213,1),rgba(11,106,193,1));
      border-radius:1px;
      line-height:24px;
      text-align: center;
      position: absolute;
      right:70px;
      top:0px;
      cursor: pointer;
      border-radius: 5px;
      i {
        margin-right:5px;
      }
    }
    .btns{
      display:flex;
      justify-content: center;
      align-items: center;
      margin-top:15px;
      div{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        border-radius:1px;
        line-height:40px;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
        width:114px;
        height:40px;
        color:rgba(255,255,255,1);
      }
      .commit{
        background:linear-gradient(90deg,rgba(42,94,213,1),rgba(11,106,193,1));
        i {
          margin-right:5px;
        }
      }
      .esc{
        border:1px solid rgba(42,94,213,1);
        margin-right:10px;
      }
    }

    ul{
      margin-top:20px;
      padding-left:8px;
      padding-right:8px;
      li{
        margin-bottom:14px;
        display: flex;
        .t{
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          opacity:0.6;
          margin-right:15px;
          line-height:30px;
        }
        .input{
          width:254px;
          height:30px;
          line-height:30px;
          background:rgba(7,21,45,1);
          border-radius:1px;
          input{
            width:100%;
            height:20px;
            line-height:20px;
            padding:5px 0 5px 18px;
            background:none;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(168,225,254,1);
          }
        }
        .txt{
          width:254px;
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(168,225,254,1);
          line-height:20px;
          min-height:120px;
          max-height:120px;
          overflow: hidden;
          /deep/ .el-textarea__inner{
            background:rgba(7,21,45,1);
            border:none;
            color:rgba(168,225,254,1);
          }
        }
      }
    }
  }
}
</style>