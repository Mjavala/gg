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
export default {
    data () {
        return {
            conditionsMet: true,
            lightmode: this.$store.state.lightmode,
            loading: false,
        }
    },
    computed: {
        disabled() {
            return this.conditionsMet
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
        sendHandler(){
            console.log('sending...')
        }
    }
}
</script>

<style>
    #send-tip-wrap {
        padding-top: 1.5em;
    }
</style>