// initial state
const state = {
  matchArray: [],
};

const actions = {
  updateMatches({ commit }, matches) {
    commit('updateMatches', matches);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  updateMatches(state, matches) {
    state.matchArray = [...matches];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
