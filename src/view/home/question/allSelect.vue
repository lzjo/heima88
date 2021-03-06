<template>
  <div class="allSelect">
    <div v-if="form.type==1">
      <div class="item" v-for="(item,index) in form.select_options" :key="index">
        <el-radio
          v-model="form.single_select_answer"
          :label="item.label"
          @change="radiochange"
        >{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
        <div>
          <upload v-model="item.image"></upload>
        </div>
      </div>
    </div>
    <div v-else-if="form.type==2">
      <div class="item" v-for="(item,index) in form.select_options" :key="index">
        <el-checkbox
          v-model="form.multiple_select_answer"
          :label="item.label"
          @change="radiochange"
        >{{item.label}}</el-checkbox>
        <el-input v-model="item.text"></el-input>
        <div>
          <upload v-model="item.image"></upload>
        </div>
      </div>
    </div>
    <div v-else>
      <el-input v-model="form.short_answer" type="textarea" rows="6" @change="radiochange"></el-input>
    </div>
  </div>
</template>

<script>
import upload from "./upload.vue";
export default {
  components: {
    upload
  },
  props: ["form"],
  methods: {
    radiochange() {
      this.$emit("change");
    }
  }
};
</script>

<style lang="less">
.allSelect {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>