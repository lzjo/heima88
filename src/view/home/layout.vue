<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight"></i>
        <img class="keyimg" src="@/assets/img/login-logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="keypic" :src="userInfo.avatar" alt />
        <span class="name">{{userInfo.username}},您好</span>
        <el-button type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUseInfo } from "@/api/home.js";
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  created() {
    getUseInfo().then(res => {
      this.userInfo = res.data;
      this.userInfo.avatar =
        process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
      console.log("用户信息获取", res);
    });
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(232, 233, 236, 1);
    .left {
      .setheight {
        font-size: 20px;
      }
      .keyimg {
        margin: 0 15px;
      }
      .title {
        font-size: 22px;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .keypic {
        width: 43px;
        height: 43px;
      }
      .name {
        margin: 0 15px;
      }
    }
  }
  .aside {
    background: rgba(232, 233, 236, 1);
  }
}
</style>