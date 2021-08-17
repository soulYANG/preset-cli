<template>
  <div class="innerWrap">
    <el-button type="primary" class="addbtn" @click="handleAdd">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column prop="typeName" label="方案类型"> </el-table-column>
      <el-table-column prop="keyword" label="关键词"></el-table-column>
      <el-table-column label="是否关注">
        <template v-slot="slotScope">
          <el-switch
            v-model="slotScope.row.enable"
            :active-value="0"
            :inactive-value="1"
            @change="handleSwitchChange(slotScope.row)"
            active-color="rgb(36, 72, 173)"
            inactive-color="rgb(45, 59, 101)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="slotScope">
          <i
            class="el-icon-edit operation"
            @click="handleEditButtonCliked(slotScope.row)"
          ></i>

          <i
            class="el-icon-delete operation"
            @click="handleDeleteButtonCliked(slotScope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <PaginationComp
      :pagination="pagination"
      @currentChange="handleCurrentPageChange"
    />

    <el-dialog title="新增" :visible.sync="methodsTabVisible">
      <el-form :model="form">
        <el-form-item label="类型名称" required>
          <el-input v-model="form.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" required>
          <el-input v-model="form.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否关注" required>
          <el-switch
            v-model="form.enable"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(36, 72, 173)"
            inactive-color="rgb(45, 59, 101)"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="methodsTabVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDescription">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="editMethodsTabVisible">
      <el-form :model="edit">
        <el-form-item label="类型名称" required>
          <el-input v-model="edit.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" required>
          <el-input v-model="edit.keyword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="editMethodsTabVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMethods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryDescription,
  saveDescription,
  updateDescription,
  deleteDescription,
  updateDescriptionEnable,
} from "@/api/police-request";
import PaginationComp from "../Pagination.vue";

export default {
  components: {
    PaginationComp,
  },
  data() {
    return {
      tableData: [],
      postData: {},
      editData: {},
      methodsTabVisible: false,
      editMethodsTabVisible: false,
      temp: {},
      form: {
        typeName: "",
        keyword: "",
        enable: 1,
      },
      edit: {
        typeName: "",
        keyword: "",
      },pagination: {
        page: 1,
        limit: 10,
        total:null
      },
    };
  },
  created() {
    queryDescription(this.pagination).then((res) => {
     this.tableData = res.data.page.list;
      this.pagination.total = res.data.page.totalCount
    });
  },

  methods: {
    editMethods() {
      Object.assign(this.editData, this.edit);
      this.editData.id = this.temp.id;
      this.editData.typeId = this.temp.typeId;
      this.editData.del = this.temp.del;
      this.editMethodsTabVisible = false;
      updateDescription(this.editData).then((res) => {
        console.log(res, "update");
        queryDescription(this.pagination).then((res) => {
          this.tableData = res.data.page.list;
        });
      });
    },
    handleCurrentPageChange(pageNum){
      this.pagination.page = pageNum
      queryDescription(this.pagination).then((res) => {
          this.tableData = res.data.page.list;
        });
    },
    handleEditButtonCliked(item) {
      this.temp = item;
      this.edit.typeName = this.temp.typeName;
      this.edit.keyword = this.temp.keyword;
      this.editMethodsTabVisible = true;
    },
    handleDeleteButtonCliked(item) {
      deleteDescription(item.id).then((res) => {
        console.log(res, "delete");
        queryDescription(this.pagination).then((res) => {
          this.tableData = res.data.page.list;
        });
      });
    },
    handleAdd() {
      this.methodsTabVisible = true;
    },
    handleSwitchChange(item) {
      updateDescriptionEnable(item).then((res) => {
        console.log(res, "updateDescription");
      });
    },
    saveDescription() {
      Object.assign(this.postData, this.form);
      this.postData.id = Math.random();
      this.postData.typeId = Math.random();
      this.postData.del = 0;
      this.methodsTabVisible = false;
      saveDescription(this.postData).then((res) => {
        console.log(res, "saved");
        queryDescription(this.pagination).then((res) => {
          this.tableData = res.data.page.list;
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/tabs_common.less";
</style>