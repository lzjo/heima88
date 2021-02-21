<template>
  <div class="userList">
    <el-card>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="用户名称" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="setWidth" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id">
            <el-option
              v-for="(value,key,index) in $store.state.roleObj"
              :key="index"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <el-table :data="tableData" :border="true">
        <el-table-column label="序号">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+ scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180px"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
    <addUserList ref="addUserList" :mode="modefather"></addUserList>
  </div>
</template>

<script>
import { getUserData, delUserData, setUserStatus } from "@/api/user.js";
import addUserList from "./addUserList.vue";
export default {
  components: {
    addUserList
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
        username: "",
        email: "",
        role_id: ""
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
      getUserData(_pass).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
        console.log("用户数据", res);
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
      (this.$refs.addUserList.form = {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      }),
        (this.$refs.addUserList.dialogVisible = true);
    },
    setstatus(id) {
      setUserStatus({ id }).then(() => {
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
        delUserData({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    edit(row) {
      this.modefather = "edit";
      this.$refs.addUserList.dialogVisible = true;
      this.$refs.addUserList.form = JSON.parse(JSON.stringify(row));
    }
  }
};
</script>

<style lang="less">
.userList {
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