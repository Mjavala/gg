<template>
    <div id="app-inner-wrap">
        <SelectStreamer />
        <Select />
        <div id="tip-amount-wrap">
            <TipInput />
            <SendTip />
        </div>
        <!-- reset state -->
        <div id="app-back-wrap" @click="resetHandler()" :style="[
            lightmode ? {color: '#201c2b'} : {color: '#c32aff'}
            ]">
            <font-awesome-icon icon="undo" size="lg"/>
        </div>
    </div>
</template>

<script>
import Select from './Select.vue'
import SelectStreamer from './SelectStreamer.vue'
import TipInput from './TipInput.vue'
import SendTip from './SendTip.vue'

export default {
    components: {
        Select,
        SelectStreamer,
        TipInput,
        SendTip
    },
    data () {
        return {
            lightmode: this.$store.state.lightmode
        }
    },
    created (){
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'changeMode') this.lightmode = state.lightmode
        })
    },
    methods: {
        resetHandler() {
            this.$store.commit('changeIsConnected', false)
        }
    }
}
</script>

<style scoped>
    #tip-amount-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 2em;
        flex-direction: column;
    }
    #app-inner-wrap {
        position: relative;
    }
    #app-back-wrap {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
</style>