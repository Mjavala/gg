import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: {
      ethereumError: false
    },
    lightmode: true,
    broadcastAddress: '',

  },
  mutations: {
    noEthereumError(state, update) {
      state.errors.ethereumError = update
    },
    changeBroadcastAddress(state, update) {
      state.broadcastAddress = update
    },
  },
  actions: {
  },
  modules: {
  }
})
