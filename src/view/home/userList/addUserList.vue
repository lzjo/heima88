<template>
  <el-dialog :visible.sync="dialogVisible" width="600px" class="addUserList">
    <div slot="title" class="title">{{mode=='add'?"新增用户":'编辑用户'}}</div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id">
          <el-option
            v-for="(value,key,index) in $store.state.roleObj"
            :key="index"
            :label="value"
            :value="+key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
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
import { addUserData, editUserData } from "@/api/user.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱");
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号");
              }
            }
          }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },

  watch: {
    dialogVisible(newval) {
      if (newval == true) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        console.log(result);
        if (result) {
          if (this.mode == "add") {
            addUserData(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.$parent.search();
            });
          } else {
            editUserData(this.form).then(() => {
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
.addUserList {
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