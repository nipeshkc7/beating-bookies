import Vue from 'vue';
import Axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import store from './store';
import App from './App.vue';
import router from './router';
import authHeader from './_helpers/authHeader';

Vue.prototype.$http = Axios;
// adding authorization header to every request
Axios.interceptors.request.use(authHeader);
Vue.config.productionTip = false;

Vue.use(Buefy);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
