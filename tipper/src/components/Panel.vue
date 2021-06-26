<template>
  <div id="panel-root" :style="[
    lightmode ? {backgroundColor: '#6441A4'} : {backgroundColor: '#201c2b'}
    ]"
  >
    <Nav :lightmode="lightmode"/>
    <div id="pannel-inner">
      <div class="spacer-1"></div>
      <entry :lightmode="lightmode"/>
      <div class="message-wrap">
        <div class="message lightmode-text">
          New to Crypto? 
        </div>
        <div class="onboard-wrap" :style="[
            lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
            ]">
          <font-awesome-icon icon="external-link-alt" size="xs"/>
        </div>
      </div>
      <div class="spacer-1">
        <div class="message-wrap error-msg error-msg-1 fade-in" v-if="noWeb3">
          <div class="message lightmode-text">
            Looks like you don't the <a href="https://metamask.io/" target="_blank" :style="[
              lightmode ? {color: '#201c2b'} : {color: '#c32aff'}
            ]">Metamask</a> extension installed.
          </div>
        </div>
        <div class="message-wrap error-msg fade-in" v-if="noWeb3">
          <div class="message lightmode-text">
            For support, please reach out via <a href="mailto:geriatricsgaming@gmail.com" target="_blank" :style="[
              lightmode ? {color: '#201c2b'} : {color: '#c32aff'}
            ]">Email</a> or discord.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import entry from './Entry.vue'
import Nav from './Header.vue'

export default {
  components: {
    entry,
    Nav
  },
  data () {
    return {
      lightmode: false,
      noWeb3: false
    }
  },
    created () {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'noEthereumError') {
            this.noWeb3 = state.errors.ethereumError
        }
      })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #panel-root {
    height: 100%;
    width: 100%;
    position: relative;
  }
  #pannel-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-content: center;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    padding: 0px 10px;
  }
  .message-wrap {
    padding: 7% 0;
    text-align: center;
  }
  .message {
    padding-right: 5px;
    display: inline;
    font-size: 0.85em;
    color: #e5e3e8;
  }
  .onboard-wrap {
    display: inline-flex;
    justify-content: center;
    align-items: center;

  }
  .error-msg {
    font-size: 80%;
    padding: 1em;
  }
  .error-msg-1 {
    display: inline-block;
    padding-top: 1em;
    transition: all 10s linear;
  }
  .spacer-1 {
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  /* twitch util classes */
  .lightmode {
    background-color: #6441A4;
  }
  /*fade in anim */
  .fade-in {
    animation: fadeIn ease 4s;
    -webkit-animation: fadeIn ease 4s;
    -moz-animation: fadeIn ease 4s;
    -o-animation: fadeIn ease 4s;
    -ms-animation: fadeIn ease 4s;
  }

  @keyframes fadeIn{
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
</style>
