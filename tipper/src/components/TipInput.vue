<template>
    <div id="tip-input-wrap">
        <div id="tip-input-inner-wrap">
            <input id="tip-input" v-model="input" type="number" :style="[
                lightmode ? {borderColor: '#e5e3e8', color: '#e5e3e8'} : {borderColor: '#c32aff', color: '#e5e3e8'}
                ]"/>
        </div>
        <Balance />
    </div>
</template>

<script>
import Balance from './web3/Balance.vue'
export default {
    components: {
        Balance
    },
    data() {
        return {
            input: 0,
            lightmode: this.$store.state.lightmode,
            tokenBalance: 0
        }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'changeMode')  this.lightmode = state.lightmode
        if (mutation.type === 'changeTokenBalance') this.tokenBalance = state.tokenBalance
      })
    },
    watch: {
        input(newVal) {
            // input must be less or equal to token balance
            if (this.tokenBalance >= newVal) {
                const tipInput = document.getElementById('tip-input')
                tipInput.classList.remove('input-error')
                this.$store.commit('changeTipAmount', newVal)
            }
            else {
                const tipInput = document.getElementById('tip-input')
                tipInput.classList.add('input-error')
            } 
        }
    }
}
</script>

<style scoped>
    #tip-input-inner-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
    input[type=number] {
        width: 75%;
        padding: 10px 19px;
        margin: 8px 0;
        box-sizing: border-box;
        background: transparent;
        border-radius: 22px;
        font-family: 'Comfortaa', cursive !important;
        outline: none;
    }
    .input-error {
        border-color: red !important;
    }
</style>