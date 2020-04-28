<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/dashboard/analysis">dashboard</router-link> |
      <router-link to="/form">form</router-link>
    </div> -->
    <router-view></router-view>
  </div>
</template>
<script>
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      locale: ""
    };
  },
  watch: {
    locale() {
      console.log(moment);
    }
  }
};
</script>
<style lang="less"></style>
