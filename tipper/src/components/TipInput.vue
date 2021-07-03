<template>
    <div id="tip-input-wrap">
        <div id="tip-input-inner-wrap">
            <input v-model="input" type="number" :style="[
                lightmode ? {borderColor: '#e5e3e8', color: '#e5e3e8'} : {borderColor: '#c32aff !important', color: '#e5e3e8'}
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
            lightmode: this.$store.state.lightmode
        }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'changeMode') {
          this.lightmode = state.lightmode
        }
      })
    },
    watch: {
        input(newVal) {

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
</style>