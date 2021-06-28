<template>
      <div class="spacer">
        <div class="message-wrap error-msg error-msg-1 fade-in" v-if="noWeb3">
          <div class="message">
            Looks like you don't the <a href="https://metamask.io/" target="_blank" :style="[
              lightmode ? {color: '#201c2b'} : {color: '#c32aff'}
            ]">Metamask</a> extension installed.
          </div>
        </div>
        <div class="message-wrap error-msg fade-in" v-if="noWeb3">
          <div class="message">
            For support, please reach out via <a href="mailto:geriatricsgaming@gmail.com" target="_blank" :style="[
              lightmode ? {color: '#201c2b'} : {color: '#c32aff'}
            ]">Email</a> or discord.
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props: ['lightmode'],
    data () {
        return {
            noWeb3: this.$store.state.ethereumError
        }
    },
    created () {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'noEthereumError') {
            this.noWeb3 = state.errors.ethereumError
        }
      })
    }
}
</script>

<style scoped>
  .error-msg {
    font-size: 80%;
    padding: 1em;
  }
  .error-msg-1 {
    display: inline-block;
    padding-top: 1em;
    transition: all 10s linear;
  }
</style>