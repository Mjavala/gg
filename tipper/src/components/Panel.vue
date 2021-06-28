<template>
  <div id="panel-root" :style="[
    lightmode ? {backgroundColor: '#6441A4'} : {backgroundColor: '#201c2b'}
    ]"
  >
    <Nav :lightmode="lightmode"/>
    <div id="pannel-inner">
      <div class="spacer"></div>
      <App />
      <Cta :lightmode="lightmode" />
      <ErrorMessages :lightmode="lightmode" />
    </div>
  </div>
</template>

<script>
import Cta from './Cta.vue'
import App from './App.vue'
import ErrorMessages from './ErrorMessages.vue'
import Nav from './Header.vue'

export default {
  components: {
    App,
    Nav,
    ErrorMessages,
    Cta
  },
  data () {
    return {
      lightmode: this.$store.state.lightmode,
      token: '',
      channelId: '',
      clientId: 'ijc79hccu6xftlc6uryuqlwwsbl6va',
      extensionVersion: '0.0.1',
      baseUrl: 'https://api.twitch.tv/extensions',
      signedToken: ''

    }
  },
  async beforeMount () {
    await window.Twitch.ext.onAuthorized((auth) => {
      this.token = auth.token
      this.channelId = auth.channelId
      this.clientId = auth.clientId
      //window.Twitch.ext.rig.log('The JWT that will be passed to the EBS is', auth.token);
      //window.Twitch.ext.rig.log('The channel ID is', auth.channelId);
      this.sendToken()
    })
  },
  methods: {
    sendToken() {
      try {
        //const data = {'hello': 'world'}
        this.axios.get('http://localhost:3000/chat', {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
        }).then(res => {
          window.Twitch.ext.rig.log(res)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

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
</style>
