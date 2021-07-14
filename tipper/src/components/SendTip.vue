<template>
    <div id="send-tip-wrap">
        <button :disabled="!disabled" id="connect-button" type="submit" class="outline purple-white" @click="sendHandler()" :style="[
            lightmode ? {borderColor: '#e5e3e8'} : {borderColor: '#c32aff !important'}
            ]"
        >
        <div v-if="!loading" class="button-inner">
            Send
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
import { ethers } from "ethers";
import abi from '@/contracts/lootswap/hrc20ABI.json'
import { lootswapContractAddress, ggContractAddress } from '@/contracts/lootswap/index.js'
import gql from 'graphql-tag'

export default {
    data () {
        return {
            conditionsMet: true,
            lightmode: this.$store.state.lightmode,
            loading: false,
            // tip config
            selectedStreamer: '',    // address
            selectedToken: '',       //address
            tipAmount: 0,
        }
    },
    computed: {
        disabled() {
            return this.conditionsMet
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'changeMode') this.lightmode = state.lightmode
            if (mutation.type === 'changeSelectedStreamer') this.selectedStreamer = state.selectedStreamer
            if (mutation.type === 'changeSelectedToken') this.selectedToken = state.selectedToken
            if (mutation.type === 'changeTipAmount') this.tipAmount = state.tipAmount
        })
    },
    methods: {
        async sendHandler() {
            if (!ethers.utils.isAddress(this.selectedStreamer.address)) {
                console.log('invalid streamer address')
                return
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const account = provider.provider.selectedAddress
            const val = ethers.utils.parseEther(String(this.tipAmount))
            if (this.selectedToken.name === 'ONE') {
                // native token
                try {
                    this.loading = true
                    await signer.sendTransaction({ to: this.selectedStreamer.address, from: account, value: val })
                    this.loading = false
                } catch (e) {
                    console.trace(e)
                }
            } else {
                // HRC20 Token
                if (this.selectedToken.name === 'GG') {
                    // only track GG
                    const contract = new ethers.Contract(ggContractAddress, abi, signer)
                    await contract.transfer(this.selectedStreamer.address, val)
                    this.updateDB(this.selectedStreamer, this.tipAmount + this.selectedStreamer.tips)
                }
                else if (this.selectedToken.name === 'LOOT') {
                    const contract = new ethers.Contract(lootswapContractAddress, abi, signer)
                    await contract.transfer(this.selectedStreamer.address, val)

                }
            }
        },
        updateDB(user, amount) {
            this.$apollo.mutate({
                mutation: gql `mutation ($username: String!, $tip: numeric!) {
                    update_streamers(where: {username: {_eq: $username}},  _set: {tips: $tip}) {
                        affected_rows
                    }
                }`,
                variables: {
                    username: user,
                    tip: amount
                }
            })
        }
    }
}
</script>

<style>
    #send-tip-wrap {
        padding-top: 1.5em;
    }
</style>
