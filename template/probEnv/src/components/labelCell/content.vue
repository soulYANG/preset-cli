<template>
  <div class="content default-layout">
    <div class="her-wrap">
      <div class="title">标签体系</div>
      <div class="add-btn" @click="showeDialogFun">新建标签</div>
    </div>
    <div class="wrap">
      <div class="seach">
        <el-input
          id="seach"
          placeholder="查询标签"
          v-model="filterText">
        </el-input>
        <i class="seach-btn"></i>
      </div>
      <i class="jao left-top"></i>
      <i class="jao left-bom"></i>
      <i class="jao right-top"></i>
      <i class="jao right-bom"></i>
      <div class="left-wrap">
        <div class="tree-wrap">
          <div class="inner">
            <el-tree
              class="filter-tree"
              :data="tagData"
              :props="defaultProps"
              node-key="id"
              :default-expanded-keys="[1]"
              :filter-node-method="filterNode"
              ref="tree"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
        </div>
        <div class="tag-wrap">
          <span class="tag" v-for="(item,index) in tagWarpData" :key="index" @click="changeTagStausFun(item,index)" :class='index==current?"current":""'>{{item.name}}</span>
        </div>
      </div>
      <div class="right-wrap">
        <labelDetailsCell
          :tagDetailsData="tagDetailsData"
          :isEditor="isEditor"
          :deleteCurrentTag="deleteCurrentTag"
          @deleteSuss="deleteSussRefreshFun" />
      </div>
    </div>
    <dialogCell
      v-if="dialogFormVisible"
      :tagDetailsData="tagDetailsData"
      :dialogFormVisible="dialogFormVisible"
      @updateTreeData="getSelectChildren"
      @colseDialog="colseDialogFun" />
  </div>
</template>
<script>
import labelDetailsCell from './details'
import dialogCell from './dialog'
import { apiSelectChildren,apiGetTagById} from '../../api/label-requst'
export default {
  data(){
    return{
      dialogFormVisible: false,
      filterText: '',
      tagData:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tagDetailsData:{
        parentName:''
      },
      isEditor:true,
      tagWarpData:[],
      current:'-1',
      currentName:'',
      deleteCurrentTag:false
    }
  },
  props:['args'],
  components:{
    labelDetailsCell,
    dialogCell
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods:{
    //递归查询子标签
    getSelectChildren(){
      apiSelectChildren({}).then(res => {
        if(res.code==200){
          this.tagData = res.data;
        }else{
          this.$message(res.message);
        }
      })
    },
    //根据ID查询标签
    getTagDetails(id,currentName){
      apiGetTagById({id}).then(res => {
        if(res.code==200){
          this.tagDetailsData = Object.assign(res.data,{'parentName':currentName?currentName:this.tagDetailsData.parentName});
        }else{
          this.$message(res.message);
        }
      })
    },
    handleNodeClick(data,node) {
      this.tagDetailsData.parentName = node.parent&&node.parent.data.name;
      this.getTagDetails(data.id);
      this.tagWarpData = data.children;
      this.current = '-1';
      this.currentName = node.data&&node.data.name;
      this.deleteCurrentTag = true;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    showeDialogFun(){
      this.dialogFormVisible = true;
    },
    colseDialogFun(){
      this.dialogFormVisible = false;
    },
    changeTagStausFun(item,index){
      this.current=index;
      this.getTagDetails(item.id,this.currentName);
      this.deleteCurrentTag = true;
    },
    deleteSussRefreshFun(isDeleteCurrentTag){
      //更新树
      this.getSelectChildren();
      //删除选中的tag
      // if(isDeleteCurrentTag){
      //   this.tagWarpData
      //   this.deleteCurrentTag = false;
      //   document.querySelector('.current').remove();
      // }
      this.deleteCurrentTag = false;
      //更新标签详情
      this.tagDetailsData = {
        name:'',
        parentName:'',
        region:'',
        code:'',
        mappingCode:'',
        description:''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getSelectChildren();
    });
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/common';
.content{
  .her-wrap{
    overflow: hidden;
    margin-bottom:14px;
    position: relative;
    .title{
      float: left;
    }
    .add-btn{
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      width:114px;
      height:40px;
      background:linear-gradient(90deg,rgba(42,94,213,1),rgba(11,106,193,1));
      border-radius:1px;
      line-height:40px;
      text-align: center;
      cursor: pointer;
      float: right;
      border-radius: 4px;
    }
  }
  .wrap{
    min-height:540px;
    max-height:540px;
    overflow: hidden;
    background:url(../../assets/img/dot.png) no-repeat 0 0;
    border:1px solid rgba(34,118,230,0.1);
    background-color: rgba(53,118,205,0.04);
    display: flex;
    .seach{
      width:18%;
      height:40px;
      line-height:40px;
      padding-left:28px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(60,92,141,1);
      position: absolute;
      left: 20px;
      top:20px;
      background:rgba(19,36,63,0.8);
      z-index:100;
      /deep/ .el-input__inner{
        height:100%;
        width:100%;
        background: none;
        color:#fff;
        padding:0;
      }
      .seach-btn{
        width:20px;
        height:21px;
        background:url(../../assets/img/sousuo.png) no-repeat 0 0;
        position: absolute;
        top:10px;
        right:20px;
        cursor: pointer;
      }
    }

    .left-wrap{
      position: relative;
      flex:2.5;
      overflow: hidden;
      display: flex;

      .tree-wrap{
        height:440px;
        flex:1;
        margin-top:70px;
        margin-left:12px;
        overflow: hidden;
        .inner{
          height:100%;
          overflow-x:hidden;
          overflow-y: scroll;
        }
        .inner::-webkit-scrollbar{
          width:10px;
          opacity: 0.1;
        }
        .inner::-webkit-scrollbar-track{
          background: #040e1d;
          border-radius:10px;
        }
        .inner::-webkit-scrollbar-thumb{
          background: #12203d;
          border-radius:10px;
        }
        .inner::-webkit-scrollbar-thumb:hover{
          background: #12203d;
        }
        .inner::-webkit-scrollbar-corner{
          background: #040e1d;
        }
      }

      .tag-wrap{
        flex:2;
        flex-flow: wrap;
        justify-content: left;;
        align-items: left;
        height:480px;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-top:20px;
        padding-left:20px;
        padding-bottom:40px;
        border-left:1px solid rgba(12, 32, 66, 1);
        .tag{
          height:40px;
          line-height:40px;
          text-align: center;
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(8,221,245,1);
          margin-right:20px;
          margin-bottom:14px;
          background:rgba(8,221,245,0.2);
          border:1px solid rgba(23,213,234,1);
          padding:0 20px;
          border-radius:3px;
          display: inline-block;
          cursor: pointer;
        }
        .current{
          background:rgba(26,132,144,1);
          border-radius:3px;
          color:#fff;
          border-color:rgba(26,132,144,1);
        }
      }
      .tag-wrap::-webkit-scrollbar{
        width:10px;
        opacity: 0.1;
      }
      .tag-wrap::-webkit-scrollbar-track{
        background: #040e1d;
        border-radius:10px;
      }
      .tag-wrap::-webkit-scrollbar-thumb{
        background: #12203d;
        border-radius:10px;
      }
      .tag-wrap::-webkit-scrollbar-thumb:hover{
        background: #12203d;
      }
      .tag-wrap::-webkit-scrollbar-corner{
        background: #040e1d;
      }
      /deep/ .el-tree{
        background:none;
        .el-tree-node__label{
          color:#4FC3FF;
          font-size:18px;
        }
        .el-tree-node:focus>.el-tree-node__content{
          background:rgb(35, 83, 145, 0.1);
        }
        .el-tree-node__content:hover{
          background:rgb(35, 83, 145, 0.5);
        }
      }
    }
  }
}
</style>