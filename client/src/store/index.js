import Vue from 'vue';
import Vuex from 'vuex';
import latestMatches from './latestMatches.module';

Vue.use(Vuex);
// Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    latestMatches,
  },
});
