<template>
    <div id="connect-wrap">
        <button id="connect-button" type="submit" class="outline purple-white" @click="connectHandler()" :style="[
            lightmode ? {borderColor: '#e5e3e8'} : {borderColor: '#c32aff !important'}
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
</template>

<script>
import { initWeb3 } from '@/web3/init.js'
import { HARMONY_MAINNET_PARAMS } from '@/constants/harmony.js'

export default {
    data () {
        return {
            lightmode: this.$store.state.lightmode,
            loading: false,
            provider: {}
        }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'changeMode') {
          this.lightmode = state.lightmode
        }
      })
    },
    methods: {
        async connectHandler() {
          this.loading = true
          this.connectStylesHandler()
          // ethers
          try {
            await initWeb3(this)
          } catch (e) {
            this.$store.commit('noEthereumError', true)
            console.log(e)
            return
          }
        },
        requestNetworkChange() {
          try {
            this.provider.provider.request({
              method: 'wallet_addEthereumChain',
              params: [HARMONY_MAINNET_PARAMS]
            })
            return true
          } catch (e) {
            console.log(e)
            return false
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

<style>
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
</style>