<template>
  <el-dialog title="新建标签" :close-on-click-modal='false' :show-close='false' :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="标签名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属类别" :label-width="formLabelWidth">
        <el-input v-model="categoryName" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="主题专项" :label-width="formLabelWidth">
        <el-select v-model="form.tagTopicId" placeholder="请选择主题专项">
          <el-option label="主题专项1" value="shanghai"></el-option>
          <el-option label="主题专项2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签代码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="映射代码" :label-width="formLabelWidth">
        <el-input v-model="form.mappingCode" autocomplete="off" border="1"></el-input>
      </el-form-item>
      <el-form-item label="标签描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="obser">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { apiInsertTag } from '../../api/label-requst'
export default {
  data(){
    return{
      form: {
        name: '',
        tagTopicId: '',
        code: '',
        mappingCode: '',
        description: '',
        id:'',
        parentId:this.tagDetailsData.parentId || '0',
      },
      formLabelWidth: '120px',
      categoryName: this.tagDetailsData.parentName || '',
    }
  },
  name: 'dialogCell',
  props: ['dialogFormVisible','tagDetailsData'],
  methods:{
    submit(){
      apiInsertTag(this.form).then(res => {
        if(res.code==200){
          this.$message('添加成功');
          this.$emit('updateTreeData');
        }else{
          this.$message(res.message);
        }
        this.$emit('colseDialog');
      });
    },
    obser(){
      this.$emit('colseDialog')
    }
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
  created(){

  }
}
</script>

<style lang="less" scoped>
/deep/ input[type="text"]{
  border:1px solid #DCDFE6;
}
/deep/ .el-dialog{
  background:rgba(12, 32, 66, 1);
  .el-dialog__title{
    color:rgba(255, 255, 255, 0.8);
  }
  .el-form-item__label{
    color:rgba(255, 255, 255, 0.6);
  }
  .el-input__inner,.el-textarea__inner{
    color:rgba(255, 255, 255, 0.6);
    background:#07152d;
    border-color: #07152d;
  }
}
</style>
