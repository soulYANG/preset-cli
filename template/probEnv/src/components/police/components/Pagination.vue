<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pagination.limit"
    :total="pagination.total"
    @current-change="currentChange"
  >
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    pagination: {
        type:Object
    },
  },
  methods: {
    currentChange(pageNum) {
      this.$emit("currentChange",pageNum);
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>