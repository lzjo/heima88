<template>
  <el-dialog :visible.sync="dialogVisible" width="600px" class="addbusiness">
    <div slot="title" class="title">{{mode=='add'?"新增企业":'编辑企业'}}</div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addBusinessData, editBusinessData } from "@/api/business.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "change" }],
        name: [
          { required: true, message: "请输入企业名称", trigger: "change" }
        ],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "change" }
        ],
        intro: [
          { required: true, message: "请输入企业简介", trigger: "change" }
        ]
      }
    };
  },
  //   watch: {
  //     dialogVisible(newval) {
  //       if (newval == false) {
  //         this.$refs.form.resetFields();
  //       }
  //     }
  //   },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        console.log(result);
        if (result) {
          if (this.mode == "add") {
            addBusinessData(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.$parent.search();
            });
          } else {
            editBusinessData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogVisible = false;
              this.$parent.search();
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addbusiness {
  .title {
    text-align: center;
    height: 53px;
    line-height: 53px;
    color: white;
    background-color: rgba(64, 158, 255);
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
  .footer {
    text-align: center;
  }
}
</style>