<template>
<el-dialog
  :visible.sync="dialogVisible"
  width="600px"
  class="register"
  :show-close="false">
  <div slot="title" class="title">用户注册</div>
</el-dialog>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            dialogVisible: false
        };
    },
};
</script>

<style lang="less">
.register{
    .title{
        text-align: center;
        height: 53px;
        line-height: 53px;
        background: rgba(3, 129, 249, 1);
        color: white;
    }
    .el-dialog__header{
        padding: 0;
    }
}
</style>