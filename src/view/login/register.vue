<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="600px"
    class="register"
    :show-close="false"
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <div slot="title" class="title">用户注册</div>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl + '/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <div class="picheight">
              <img class="code" :src="codeUrl" @click="codeUrlimg" alt="" />
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button class="rcodebtn" @click="getRcode">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="" class="centerClick">
      <el-button>取消</el-button>
      <el-button type="primary" @click="confirmClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
import getphonecode from "@/api/register.js";
export default {
  name: "register",
  data() {
    return {
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      dialogVisible: false,
      form: {
        // 保存的图片链接
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: "",
      },
      // 验证规则
      rules: {
        avatar: [{ required: true, message: "请上传图片", trigger: "change" }],
        username: [
          { required: true, message: "请填写昵称", trigger: "change" },
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
            },
          },
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
            },
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6到12位密码", trigger: "change" },
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位图形码", trigger: "change" },
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "change" },
        ],
      },
      //基地址
      baseUrl: process.env.VUE_APP_URL,
      //上传的 图片
      imageUrl: "",
    };
  },
  methods: {
    // 图片上传成功后的方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
      console.log(this.avatar);
    },
    // 图片上传前的方法
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击切换图片
    codeUrlimg() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t" + Date.now();
    },
    // 点击确定全局验证方法
    confirmClick() {
      this.$refs.form.validate((res) => {
        console.log(res);
      });
    },
    // 点击获取验证码
    getRcode() {
      let _pass = true;
      this.$refs.form.validateField(["code", "phone"], (error) => {
        if (error != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        getphonecode({
          code: this.form.code,
          phone: this.form.phone,
        }).then((res) => {
          console.log(res);
          this.$message.success(res.data.data.captcha + "");
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  .title {
    text-align: center;
    height: 53px;
    line-height: 53px;
    background: rgba(3, 129, 249, 1);
    color: white;
  }
  .centerClick {
    text-align: center;
  }
}
</style>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .picheight {
    height: 40px;
    .code {
      width: 100%;
      height: 40px;
      border: 1px dashed #ccc;
    }
  }
  .rcodebtn {
    width: 100%;
  }
}
</style>