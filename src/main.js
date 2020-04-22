import Vue from "vue";
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// import Button from "ant-design-vue/lib/button";
// import "ant-design-vue/lib/button/style";
// import { Button } from "ant-design-vue";
import "../antd.conf";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";

Vue.config.productionTip = false;

// Vue.use(Antd);
// Vue.use(Button);
Vue.component("Authorized", Authorized);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
