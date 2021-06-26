import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: {
      ethereumError: false
    }
  },
  mutations: {
    noEthereumError(state, update) {
      state.errors.ethereumError = update
    }
  },
  actions: {
  },
  modules: {
  }
})
