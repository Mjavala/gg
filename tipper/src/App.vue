<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted() {
    let mode = window.localStorage.getItem('lightmode')
    mode = (mode === 'true');
    this.$store.commit('changeMode', mode)
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
