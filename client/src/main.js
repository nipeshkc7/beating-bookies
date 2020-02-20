import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import authHeader from './_helpers/authHeader';

Vue.prototype.$http = Axios;
// adding authorization header to every request
Axios.interceptors.request.use(authHeader);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
