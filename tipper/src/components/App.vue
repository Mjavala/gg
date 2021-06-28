<template>
    <div id="entry-wrap">
        <h1 class="title">GG Tips</h1>
        <Connect />
    </div>
</template>

<script>
import Connect from './web3/Connect.vue'

export default {
  components: {
    Connect
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
</style>