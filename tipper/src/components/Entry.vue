<template>
    <div id="entry-wrap">
        <h1 class="title lightmode-text">GG Tips</h1>
        <div id="connect-wrap">
            <button id="connect-button" type="submit" class="outline purple-white" @click="connectHandler()" :style="[
                lightmode ? {borderColor: '#e5e3e8'} : {borderColor: '#c32aff'}
                ]"
            >
            <div v-if="!loading" class="button-inner">
                Connect
            </div>
            <div id="button-wrap" class="button-inner" :style="[
                lightmode ? {color: '#e5e3e8'} : {color: '#c32aff'}
              ]">
                <font-awesome-icon class="loader" v-if="loading" icon="spinner" size="lg"/>
            </div>
            </button>
        </div>
    </div>
</template>

<script>
import { ethers } from "ethers";
import { HARMONY_MAINNET_PARAMS, HARMONY_TESTNET_PARAMS  } from '@/constants/harmony.js'

export default {
    props: ['lightmode'],
    data() {
        return {
            loading: false,
            connecting: false,
            // web3 stuff //
            provider: {},
            networkId: 1
        }
    },
    methods: {
        async connectHandler() {
          this.loading = true
          this.connecting = true
          this.connectStylesHandler()
          // ethers
          try {
            await window.ethereum.enable()
          } catch (e) {
            this.$store.commit('noEthereumError', true)
            console.log(e)
            return
          }
          this.provider = new ethers.providers.Web3Provider(window.ethereum)
          //console.log(`0x${parseInt(Number(HARMONY_TESTNET_PARAMS.chainId, 2)).toString(16)}`)

          try {
            this.provider.provider.request({
              method: 'wallet_addEthereumChain',
              params: [HARMONY_MAINNET_PARAMS]
            })
          } catch (e) {
            console.log(e)
          }
        },
        connectStylesHandler() {
          if (this.lightmode) {
              // border go dark
              document.getElementById('connect-button').classList.add('dark-border')
              // icon go dark
              document.getElementById('button-wrap').classList.add('dark-color')
          } else {
              document.getElementById('button-wrap').classList.add('light-color')
          }
        }
    }
}
</script>

<style scoped>
  .title {
    margin: 0;
    width: 100%;
    text-align: center;
    max-height: max-content;
    padding: 3% 0;
    color: #e5e3e8;
  }
  /* button styles */
  #connect-wrap {
    padding: 4% 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    cursor: pointer;
    outline: none;
    font-family: 'Comfortaa', cursive !important;
  }
  button.outline {
    position: relative;
    z-index: 3;
    background: transparent;
    border-style: solid;
    border-width: 2px;
    border-radius: 22px;
    padding: 10px 40px;
    text-transform: uppercase;
    transition: all 0.2s linear;
    width: 160px;
  }
  button.outline a {
    text-decoration: none;
  }
  button.outline:hover {
    color: white;
    background: #1172c4;
    border-color: white;
    transition: all 0.2s linear;
  }
  button.outline:active {
    border-radius: 22px;
  }
  button.purple-white {
    font-weight: 600;
    color:  #e5e3e8;
    background: transparent;
  }
  button.purple-white:hover {
    color: white;
    background: #664e96;
    border-color:  #e5e3e8;
  }
  .dark-border {
      border-color: #201c2b !important;
      transition: all 0.2s linear;
  }
  .dark-color {
      color: #201c2b !important;
      transition: all 5s linear;
  }
  .light-color {
      color:  #e5e3e8 !important;
      transition: all 10s linear;
  }
  /* loader styles */
  .loader {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>