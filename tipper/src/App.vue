<template>
  <div id="app" :style="[
    lightmode ? {backgroundColor: '#6441A4', transition: 'all 750ms linear'} : {backgroundColor: '#201c2b', transition: 'all 750ms linear'}
    ]">
    <router-view/>
    <Hex />
  </div>
</template>
<script>
import Hex from '@/components/HexAnimation.vue'
export default {
  components: {
    Hex
  },
  data() {
    return {
      lightmode: null
    }
  },
  created() {
    let mode = window.localStorage.getItem('lightmode')
    this.lightmode = (mode === 'true');
    this.$store.commit('changeMode', this.lightmode)
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeMode') this.lightmode = state.lightmode
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');
  html, body {
    font-family: 'Comfortaa', cursive !important;
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: unset;
  }
  #app {
    height: 100vh;
    width: 100vw;
    /* twitch panel max */
    overflow: hidden;
  }
</style>
