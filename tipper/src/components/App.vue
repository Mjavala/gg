<template>
    <div id="entry-wrap" :style="[
      lightmode ? {backgroundColor: 'rgb(100, 65, 164, 0.5)', transition: 'all 750ms linear'} : {backgroundColor: 'rgb(32,28,43, 0.5)', transition: 'all 750ms linear'}
    ]">
        <h1 class="title"><img id="gg" src="@/assets/gg.png" alt="">Tips</h1>
        <transition name="fade" mode="out-in">
          <Connect key="1" v-if="!isConnected" />
          <AppInner key="2" v-if="isConnected" />
        </transition>
        <TwitchConnect />
        <!-- leaderboards button -->
        <button id="lb-button" type="submit" class="outline purple-white" @click="connectHandler()" :style="[
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
import Connect from './web3/Connect.vue'
import AppInner from './AppInner.vue'
import TwitchConnect from './TwitchConnect.vue'

export default {
  components: {
    Connect,
    AppInner,
    TwitchConnect
  },
  data() {
    return {
      isConnected: this.$store.state.isConnected,
      lightmode: this.$store.state.lightmode
    }
  },
  created (){
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'changeIsConnected') this.isConnected = state.isConnected
      if (mutation.type === 'changeMode') this.lightmode = state.lightmode
    })
  }
}
</script>

<style scoped>
  #entry-wrap {
    padding: 1em;
    border-radius: 25px;
  }
  .title {
    margin: 0;
    width: 100%;
    text-align: center;
    max-height: max-content;
    padding: 3% 0;
    color: #e5e3e8;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dark-border {
      border-color: #201c2b !important;
      transition: all 0.2s linear;
  }
  .dark-color {
      color: #201c2b !important;
      transition: all 5s linear;
  }
  .light-color {
      color:  #e5e3e8 !important;
      transition: all 10s linear;
  }
  .fade-enter-active,
  .fade-leave-active {
      transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to {
      opacity: 0
  }
  #gg {
    max-height: 1.5em;
    padding-right: 0.25em;
  }
  /* mobile landscape styles */
  @media screen and (orientation:landscape)
  and (min-device-width: 640px) 
  and (max-device-width: 869px)
  and (min-device-height: 319px)
  and (max-device-height: 450px) {
    /* Your CSS Here*/
    #entry-wrap {
      padding-bottom: 2em;
    }
  }
  /* desktop  styles */
  @media screen and (min-width: 1200px) {
    .title {
      padding-bottom: 0.75em;
      font-size: 3.5em;
    }
  }
</style>