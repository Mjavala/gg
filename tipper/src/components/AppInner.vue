<template>
    <div id="app-inner-wrap">
        <SelectStreamer />
        <Select />
        <div id="tip-amount-wrap">
            <TipInput />
            <SendTip />
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
</style>