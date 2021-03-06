import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';



Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(Mint);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
