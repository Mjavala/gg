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
    isConnected: false,
    tokenBalance: 0,
    tipAmount: 0,
    selectedToken: '',
    userAccount: '',
    selectedStreamer: '',
    incorrectNetwork: false,
    streamersData: []

  },
  mutations: {
    noEthereumError(state, update) {
      state.errors.ethereumError = update
    },
    changeBroadcastAddress(state, update) {
      state.broadcastAddress = update
    },
    changeMode(state, update) {
      state.lightmode = update
    },
    changeIsConnected(state, update) {
      state.isConnected = update
    },
    changeTokenBalance(state, update) {
      state.tokenBalance = update
    },
    changeSelectedToken(state, update) {
      state.selectedToken = update
    },
    changeSelectedStreamer(state, update) {
      state.selectedStreamer = update
    },
    changeAccounts(state, update) {
      state.userAccount = update
    },
    changeTipAmount(state, update) {
      state.tipAmount = update
    },
    incorrectNetwork(state, update) {
      state.incorrectNetwork = update
    },
    changeStreamersData(state, update) {
      state.streamersData = update
    }
  }
})
