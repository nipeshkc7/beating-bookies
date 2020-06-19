import axios from 'axios';
// initial state
const state = {
  betData: [],
};

const actions = {
  updateBetData({ commit }, matches) {
    commit('updateBetData', matches);
  },
  updateFromServer({ commit }) {
    axios
      .get(`${process.env.VUE_APP_SERVER_URL}bets/getAll`, {
        params: {
          user_id: JSON.parse(localStorage.getItem('user'))
            .id,
        },
      })
      .then((response) => {
        commit('updateBetData', [...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  updateBetData(state, bets) {
    state.betData = [...bets];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
