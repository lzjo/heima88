<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <tt></tt>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import tt from '@/components/tt.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld
    tt
  }
}
</script>

<style>
@import url("~@/assets/ceshi.css");
</style>
