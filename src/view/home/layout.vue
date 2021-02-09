<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight" @click="collapse=!collapse"></i>
        <img class="keyimg" src="@/assets/img/login-logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="keypic" :src="userInfo.avatar" alt />
        <span class="name">{{userInfo.username}},您好</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <!-- 左侧从菜单栏 -->
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="collapse">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUseInfo, exitLogin } from "@/api/home.js";
import { removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      userInfo: "",
      collapse: false
    };
  },
  methods: {
    // 退出登录
    exit() {
      this.$confirm("您确定要退出嘛?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        exitLogin().then(() => {
          // 删除token
          removeToken();
          this.$router.push("/");
        });
      });
    }
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
    background: white;
    .left {
      .setheight {
        font-size: 20px;
        cursor: pointer;
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
    background: white;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 160px;
    }
  }
}
</style>