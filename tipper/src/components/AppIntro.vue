<template>
    <div id="app-intro-root">
        <connect-web-3 />
        <connect-twitch />
        <button id="lb-button" type="submit" class="outline purple-white" :style="[
            lightmode ? {borderColor: '#e5e3e8'} : {borderColor: '#c32aff !important'}
            ]"
        >
        <router-link to="/leaderboards" class="button-inner">
            Leaderboards
        </router-link>
        </button>
    </div>
</template>

<script>
import ConnectWeb3 from './web3/Connect.vue'
import ConnectTwitch from './TwitchConnect.vue'

export default {
    components: {
        ConnectWeb3,
        ConnectTwitch,
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
}
</script>

<style>
    #app-intro-root {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #lb-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 4% 0 0 0;
    }
</style>