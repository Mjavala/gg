<template>
    <div id="entry-wrap">
        <h1 class="title">GG Tips</h1>
        <transition name="fade" mode="out-in">
          <Connect key="1" v-if="!isConnected" />
          <AppInner key="2" v-if="isConnected" />
        </transition>
    </div>
</template>

<script>
import Connect from './web3/Connect.vue'
import AppInner from './AppInner.vue'

export default {
  components: {
    Connect,
    AppInner
  },
  data() {
    return {
      isConnected: this.$store.state.isConnected,
    }
  },
  created (){
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'changeIsConnected'){
        this.isConnected = state.isConnected
      }
    })
  }
}
</script>

<style scoped>
  .title {
    margin: 0;
    width: 100%;
    text-align: center;
    max-height: max-content;
    padding: 3% 0;
    color: #e5e3e8;
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
</style>