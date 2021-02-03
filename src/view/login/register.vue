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
    </el-form>
    <div slot="" class="centerClick">
      <el-button>取消</el-button>
      <el-button type="primary" @click="confirmClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      dialogVisible: false,
      form: {
        // 保存的图片链接
        avatar: "",
      },
      // 验证规则
      rules: {
        avatar: [{ required: true, message: "请上传图片", trigger: "change" }],
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
    // 点击确定全局验证方法
    confirmClick() {
      this.$refs.form.validate((res) => {
        console.log(res);
      });
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
}
</style>