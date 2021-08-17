<template>
  <div class="surveillanceWrapper">
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column
        prop="caseType"
        label="案件类型"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column label="作案时段" align="center">
        <el-table-column prop="morning" label="上午" align="center">
        </el-table-column>
        <el-table-column prop="afternoon" label="下午" align="center">
        </el-table-column>
        <el-table-column prop="night" label="晚上" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="作案区域" align="center">
        <el-table-column prop="commercialStreet" label="商业街" align="center">
        </el-table-column>
        <el-table-column prop="residence" label="住宅" align="center">
        </el-table-column>
        <el-table-column prop="street" label="街道" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="作案方式" align="center">
        <el-table-column prop="telephone" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="doorToDoor" label="上门" align="center">
        </el-table-column>
        <el-table-column prop="pryLock" label="撬锁" align="center">
        </el-table-column>
        <!-- <el-table-column prop="pryLock" label="其他" align="center">
        </el-table-column> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPoliceJugment } from "@/api/police-request";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getPoliceJugment(payload) {
      getPoliceJugment(payload).then((res) => {
        this.tableData = res.data.data;
      });
    },
  },
  created() {
    this.getPoliceJugment();
  },
};
</script>
<style lang="less" scoped>
.surveillanceWrapper {
  width: 100%;
  height: 45%;
  color: white;
  /deep/ .el-table thead.is-group th {
    background: rgba(31, 142, 229, 0.29);
    border-color: #03153e;
  }

  /deep/ .el-table .cell,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    color: #a7d8ff;
  }

  /deep/ .el-table tr {
    background-color: rgba(10, 55, 103);
    border-color: rgb(2, 21, 52);
  }

  /deep/ .el-table--border,
  .el-table--group {
    border: none;
  }

  /deep/ .el-table--border::after,
  .el-table--group::after {
    width: 0;
  }

  /deep/ .el-table--border td,
  /deep/ .el-table td {
    background: rgba(31, 142, 229, 0.29);
    border-color: #03153e;
  }

  /deep/ .el-table::before {
    background-color: transparent;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(10, 55, 103);
  }
  /deep/ .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }
  /deep/.el-table__empty-block {
    background: rgba(31, 142, 229, 0.29);
  }
}
</style>