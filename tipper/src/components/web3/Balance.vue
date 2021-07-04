<template>
    <div id="balance-wrap">
        <div class="balance-info" :style="[
            lightmode ? {color: '#e5e3e8'} : {color: '#e5e3e8'}
            ]">
            Balance: <div class="balance">{{tokenBalance}}</div>
        </div>
    </div>
</template>

<script>
import { ethers } from "ethers";
import { weiToEth, cleanupBigNUmbers } from '@/utils.js'

export default {
    data () {
        return {
            tokenBalance: this.$store.state.tokenBalance,
            selectedToken: this.$store.state.selectedToken,
            lightmode: this.$store.state.lightmode
        }
    },
    created (){
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'changeSelectedToken') this.selectedToken = state.selectedToken
        })
    },
    watch: {
        async selectedToken(newVal) {
            setInterval(async () => {
                await this.getTokenBalance(newVal)            
            }, 1000);
        }
    },
    methods: {
        async getTokenBalance(token){
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            let balance
            if (token.name === 'ONE') {     // native token
                try {
                    balance = await this.provider.getBalance(this.provider.provider.selectedAddress)
                } catch(e) {
                    console.log(e)
                }
                // CAN BE TAKEN OUT ONCE GG IS IMPLEMENTED
                balance = weiToEth(parseInt(balance._hex, 16))
                this.tokenBalance = balance
                this.$store.commit('changeTokenBalance', this.tokenBalance)
            } else {
                // HRC20 TOKEN
                console.log('HRC20 TOKEN...')
            }
        },
    }
    
}
</script>

<style>
    #balance-wrap {
        padding-left: 3.5em;
        font-size: 0.6rem;
        opacity: 0.9;
    }
    .balance {
        display: inline;
        padding-left: 0.5em;
    }
</style>