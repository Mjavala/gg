<template>
  <div id="panel-root" :style="[
      lightmode ? {backgroundColor: '#6441A4', transition: 'all 750ms linear'} : {backgroundColor: '#201c2b', transition: 'all 750ms linear'}
  ]">
    <Nav :lightmode="lightmode"/>
    <div id="pannel-inner">
      <div v-if="!isConnected" class="spacer"></div>
      <div v-if="isConnected" class="spacer-1"></div>
      <App />
      <!--<Cta v-if="!isConnected" :lightmode="lightmode" /> -->
      <ErrorMessages :lightmode="lightmode" />
    </div>
    <Overlay v-if="incorrectNetwork"/>
  </div>
</template>

<script>
//import Cta from './Cta.vue'
import App from './App.vue'
import ErrorMessages from './ErrorMessages.vue'
import Nav from './Header.vue'
import Overlay from './Overlay.vue'

export default {
  components: {
    App,
    Nav,
    ErrorMessages,
    //Cta,
    Overlay
  },
  data () {
    return {
      lightmode: this.$store.state.lightmode,
      token: '',
      channelId: '',
      clientId: 'ijc79hccu6xftlc6uryuqlwwsbl6va',
      extensionVersion: '0.0.1',
      signedToken: '',
      serverUrl: 'https://talkuppity.tk',
      isConnected: this.$store.state.isConnected,
      incorrectNetwork: false
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeMode') this.lightmode = state.lightmode
      if (mutation.type === 'changeIsConnected') this.isConnected = state.isConnected
      if (mutation.type === 'incorrectNetwork') this.incorrectNetwork = state.incorrectNetwork

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
    transition: background-color 1000ms linear;
  }
  #pannel-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    height: 100%;
    padding: 0px 10px;
    position: relative;
    z-index: 10;
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
  .spacer {
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
  .spacer-1 {
    width: 100%;
    height: 80%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  /* loader styles */
  .loader {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  /* mobile landscape styles*/
  @media screen and (orientation:landscape)
  and (min-device-width: 640px) 
  and (max-device-width: 869px)
  and (min-device-height: 319px)
  and (max-device-height: 450px) {
    /* Your CSS Here*/
    .spacer-1 {
      min-height: 155px;
    }
  }
</style>
