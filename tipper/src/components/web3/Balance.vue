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
            tokenSymbol: this.$store.state.selectedToken,
            lightmode: this.$store.state.lightmode
        }
    },
    created (){
        this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'changeSelectedToken') {
            this.tokenSymbol = state.selectedToken
        }
        if (mutation.type === 'changeAccounts') this.getTokenBalance(true)
        })
    },
    async mounted () {
        await this.getTokenBalance(true)
    },
    methods: {
        async getTokenBalance(ether){
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
          if (ether) {
            let balance
            try {
                balance = await this.provider.getBalance(this.provider.provider.selectedAddress)
            } catch(e) {
                console.log(e)
            }
            balance = cleanupBigNUmbers(weiToEth(parseInt(balance._hex, 16))).toFixed(1)
            this.tokenBalance = balance
          } else {
            return
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