import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./config/api";

// vue-quill-edit
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

Vue.use(VueAxios, Axios);
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token") || "";

  //配置接口信息
  // Axios.defaults.baseURL = 'http://www.地址.com:8360/admin/'
  Axios.defaults.baseURL = api.rootUrl;
  Axios.defaults.headers.common["X-Nideshop-Token"] = token;

  if (!token && to.name !== "login") {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount("#app");
