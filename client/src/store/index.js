import Vue from 'vue';
import Vuex from 'vuex';
import latestMatches from './latestMatches.module';
import betData from './betData.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    latestMatches,
    betData,
  },
});
