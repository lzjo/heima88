<template>
  <div class="business">
    <el-card>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="setWidth" v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="setWidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="setWidth" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="序号">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+ scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setstatus(scope.row.id)"
              :type="scope.row.status==1?'info':'success'"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 200, 300, 400]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addbusiness ref="addbusiness" :mode="modefather"></addbusiness>
  </div>
</template>

<script>
import {
  getBusinessData,
  setBusinessstatus,
  delBusinessData
} from "@/api/business.js";
import addbusiness from "./addbusiness.vue";
export default {
  components: {
    addbusiness
  },
  data() {
    return {
      modefather: "add",
      pagination: {
        currentPage: 1,
        pageSize: 1,
        total: 10
      },
      form: {
        name: "",
        eid: "",
        username: "",
        status: ""
      },
      tableData: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      let _pass = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getBusinessData(_pass).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
        console.log("企业数据", res);
      });
    },
    search() {
      this.pagination.currentPage = 1;
      this.getdata();
      console.log(this.form);
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.search();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getdata();
      console.log(`当前页: ${val}`);
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    add() {
      this.modefather = "add";
      (this.$refs.addbusiness.form = {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      }),
        (this.$refs.addbusiness.dialogVisible = true);
    },
    setstatus(id) {
      setBusinessstatus({ id }).then(() => {
        this.$message.success("设置状态成功");
        this.getdata();
      });
    },
    del(id) {
      this.$confirm("您确定要删除嘛？", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delBusinessData({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    edit(row) {
      this.modefather = "edit";
      this.$refs.addbusiness.dialogVisible = true;
      this.$refs.addbusiness.form = JSON.parse(JSON.stringify(row));
    }
  }
};
</script>

<style lang="less">
.business {
  .setWidth {
    width: 150px;
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  .red {
    color: red;
  }
}
</style>