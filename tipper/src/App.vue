<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
