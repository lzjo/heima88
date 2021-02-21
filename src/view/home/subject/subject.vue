<template>
  <div class="subject">
    <el-card>
      <el-form label-width="80px" :inline="true" :model="form" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="iptwidth" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="iptwidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="iptwidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" class="iptwidth" placeholder="请选择状态">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add" v-if="$store.state.role!='学生'">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <el-table :data="listdata" style="width: 100%">
        <el-table-column label="序号" width="70px">
          <template
            slot-scope="scope"
          >{{(pagination.currentpage-1)*pagination.pagesize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1? '启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="270px" v-if="$store.state.role!='学生'">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setstatus(scope.row.id)">{{scope.row.status==0? '启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)" v-if="$store.state.role.includes('管理员')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentpage"
          :page-sizes="[3, 20, 30, 40]"
          :page-size="pagination.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addsubject ref="addsubject" :mode="mode"></addsubject>
  </div>
</template>

<script>
import {
  getsubjectdata,
  setsubjecystatus,
  delsubjectdata
} from "@/api/subject.js";
import addsubject from "./addsubject.vue";
export default {
  components: {
    addsubject
  },
  data() {
    return {
      mode: "add",
      form: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      pagination: {
        currentpage: 1,
        pagesize: 3,
        total: 40
      },
      // table数据
      listdata: []
    };
  },
  created() {
    // 进入页面获取学科列表数据
    this.getdata();
  },
  methods: {
    setstatus(id) {
      setsubjecystatus({ id: id }).then(() => {
        this.$message.success("设置状态成功");
        this.search();
      });
    },
    getdata() {
      let _params = {
        page: this.pagination.currentpage,
        limit: this.pagination.pagesize,
        ...this.form
      };
      getsubjectdata(_params).then(res => {
        this.listdata = res.data.items;
        console.log("列表数据", res);
        this.pagination.total = res.data.pagination.total;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.pagesize = val;
      this.pagination.currentpage = 1;
      this.getdata();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentpage = val;
      this.getdata();
    },
    search() {
      this.pagination.currentpage = 1;
      this.getdata();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    del(id) {
      this.$confirm("您确定删除此条数据嘛?", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delsubjectdata({ id: id }).then(() => {
            this.$message.success("删除成功");
            this.search();
          });
        })
        .catch(() => {});
    },
    add() {
      this.mode = "add";
      this.$refs.addsubject.form = {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
      this.$refs.addsubject.dialogVisible = true;
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addsubject.dialogVisible = true;
      this.$refs.addsubject.form = JSON.parse(JSON.stringify(row));
    }
  }
};
</script>

<style lang="less">
.subject {
  .iptwidth {
    width: 130px;
  }
  .pagination {
    text-align: center;
    margin-top: 25px;
  }
}
</style>