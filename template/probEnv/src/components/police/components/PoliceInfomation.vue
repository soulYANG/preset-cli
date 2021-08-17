<template>
    <div class="policeInfomation">
        <div class="querySearch">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-form-item label="涉警人员身份证号">
                    <el-input
                        v-model="formInline.policeIdcard"
                        placeholder="涉警人员身份证号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="警情编号">
                    <el-input
                        v-model="formInline.policeId"
                        placeholder="案件编号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="案件编号">
                    <el-input
                        v-model="formInline.caseId"
                        placeholder="案件编号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input
                        v-model="formInline.keyword"
                        placeholder="关键字"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="querySearch"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <div class="queryContent">
            <el-table :data="tableData">
                <el-table-column
                    prop="id"
                    label="警情编号"
                    width="120"
                ></el-table-column>
                <el-table-column
                    prop="caseId"
                    label="案件编号"
                    width="120"
                ></el-table-column>
                <el-table-column prop="title" label="警情标题" width="220">
                </el-table-column>
                <el-table-column prop="context" label="内容描述" width="380">
                </el-table-column>
                <el-table-column prop="idcard" label="涉及身份证" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="phone" label="手机号"> </el-table-column>
                <el-table-column prop="keyword" label="关键词">
                </el-table-column>
                <el-table-column prop="crimeMeans" label="作案手段">
                </el-table-column>
                <el-table-column prop="crimeTime" label="案发时段">
                </el-table-column>
                <el-table-column prop="crimeAddress" label="案发辖区">
                </el-table-column>
            </el-table>
            <div class="tablePage">
                <el-pagination background layout="prev, pager, next" :page-size="pagination.limit" :total="pagination.total" @current-change="currentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getPoliceInfoData } from "@/api/police-request";
export default {
    name: "policeInfomation",
    data() {
        return {
            formInline: {
                idcard: "",
                id: "",
                caseId: "",
                keyword: "",
            },
            tableData: [],
            pagination:{
                total:0,
                curPage:1,
                limit: 6
            }
        };
    },
    created() {
        this.getPoliceInfoData(Object.assign({page:1,limit:this.pagination.limit},this.formInline));
    },
    methods: {
        querySearch() {
            this.getPoliceInfoData(Object.assign({page:1,limit:this.pagination.limit},this.formInline));
        },
        getPoliceInfoData(payload) {
            getPoliceInfoData(payload).then((res) => {
                this.tableData = res.data.page.list;
                this.pagination.total = res.data.page.totalCount
            })
        },
        currentChange(page){
            this.getPoliceInfoData(Object.assign({page,limit:this.pagination.limit},this.formInline));
        }
    },
};
</script>
<style lang="less" scoped>
.policeInfomation {
    .querySearch {
        margin-bottom: 20px;
        padding: 10px 0 10px 20px;
        background: rgba(3, 136, 199, 0.1);
        border: 1px solid rgba(3, 136, 199, 0.2);
        border-radius: 4px;
        opacity: 1;
        /deep/ .el-form-item {
            margin: 0 20px 0px 0;
            .el-form-item__label {
                color: #ffffff;
            }
            .el-input__inner {
                color: #fff;
                border: 1px solid #0989ff;
                background: transparent;
            }
        }
    }
    .queryContent {
        display:flex;
        flex-direction: column;
        align-items:center;
        /deep/ .el-table {
            color: #fff;
            border-color: #142d52;
            background: transparent;
            border: 1px solid #142d52;
            &:before {
                display:none;
            }
            th,
            tr,
            td {
                border-color: #142d52;
                background: transparent;
            }
            .cell,
            tbody,
            .el-table__body-wrapper,
            .el-table__body {
                border-color: #142d52;
            }
        }
        .tablePage {
            margin-top:20px;
        }
    }
}
</style>
