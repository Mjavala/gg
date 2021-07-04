<template>
    <div id="overlay-wrap">
        <div id="overlay-inner" :style="[
            lightmode ? {backgroundColor: '#201c2b', transition: 'all 750ms linear'} : {backgroundColor: '#6441A4', transition: 'all 750ms linear'}
            ]">
            <button id="change-network-button" type="submit" class="outline-network purple-white" @click="networkChangeHandler()" :style="[
                lightmode ? {borderColor: '#e5e3e8'} : {borderColor: '#c32aff !important'}
                ]"
            >
            <div v-if="!loading" class="button-inner">
                Change Network
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
import { requestNetworkChange } from '@/web3/init.js'
export default {
    data() {
        return {
            lightmode: this.$store.state.lightmode,
            loading: false
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'changeMode') this.lightmode = state.lightmode
        })
    },
    methods: {
        networkChangeHandler() {
            this.loading = true
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            requestNetworkChange(provider.provider)
            this.loading = false
        }
    }
}
</script>

<style>
#overlay-wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
#overlay-inner {
    height: 25vh;
    width: 25vh;
    box-shadow: 5px;
    border-radius: 15px;
    background-color: white;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
}
button.outline-network {
    position: relative;
    background: transparent;
    border-style: solid;
    border-width: 2px;
    border-radius: 22px;
    padding: 5px 10px;
    transition: all 0.2s linear;
}
  /* mobile landscape styles*/
  @media screen and (orientation:landscape)
  and (min-device-width: 640px) 
  and (max-device-width: 869px)
  and (min-device-height: 319px)
  and (max-device-height: 450px) {
    /* Your CSS Here*/
    #overlay-inner {
        height: 25vh;
        width: 50vh;
    }
  }
</style>