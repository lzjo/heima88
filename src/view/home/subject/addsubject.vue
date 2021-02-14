<template>
  <el-dialog :visible.sync="dialogVisible" width="600px" class="addsubject">
    <div slot="title" class="title">{{mode=='add'?'新增学科':'编辑学科'}}</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitclick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addsubjectdata, editsubjectdata } from "@/api/subject.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      }
    };
  },
  watch: {
    dialogVisible(newval) {
      if (newval == false) {
        this.$refs.form.resetFields();
      }
    },
    mode() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    }
  },
  methods: {
    submitclick() {
      this.$refs.form.validate(result => {
        console.log(result);
        if (result) {
          if (this.mode == "add") {
            addsubjectdata(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.$parent.search();
            });
          } else {
            editsubjectdata(this.form).then(() => {
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
.addsubject {
  .title {
    text-align: center;
    color: white;
    background-color: rgba(64, 158, 255);
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__close {
    color: white;
  }
  .footer {
    text-align: center;
  }
}
</style>