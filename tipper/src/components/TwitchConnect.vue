<template>
    <div class="connect-wrap">
      <a :href="url">
        <button id="connect-twitch-button" type="submit" class="outline purple-white" :style="[
            lightmode ? {borderColor: '#e5e3e8'} : {borderColor: '#c32aff !important'}
            ]"
        >
        <div v-if="!loading" class="button-inner-twitch">
            Login <font-awesome-icon class="mode-icon mode-icon-twitch" :icon="{ prefix: 'fab', iconName: 'twitch' }" />
        </div>
        <div id="twitch-button-wrap" class="button-inner" :style="[
            lightmode ? {color: '#e5e3e8'} : {color: '#c32aff'}
            ]">
            <font-awesome-icon class="loader" v-if="loading" icon="spinner" size="lg"/>
        </div>
        </button>
      </a>
    </div>
</template>

<script>
export default {
    data () {
        return {
            lightmode: this.$store.state.lightmode,
            loading: false,
            provider: {},
            clientId: 'vxm1klwoq5ak2ejir07vgk6i2nww7h',
            responseType: 'id_token',
            redirectURI: 'https://geriatricsgaming.app/onboard',
            scopes: 'openid',
            claims: {"userinfo": { "picture": null, "preferred_username": null }}
        }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'changeMode') {
          this.lightmode = state.lightmode
        }
      })
    },
    computed: {
      url() {
        return `https://id.twitch.tv/oauth2/authorize?response_type=${this.responseType}&client_id=${this.clientId}&redirect_uri=${this.redirectURI}&scope=${this.scopes}&claims=${this.claims}`
      }
    },
    methods: {
        async connectHandler() {
          this.loading = true
          this.connectStylesHandler()
          // ethers
          try {
            this.connectTwitch()
          } catch (e) {
            //this.$store.commit('noEthereumError', true)
            console.log(e)
            return
          }
        },
        connectStylesHandler() {
          if (this.lightmode) {
              // border go dark
              document.getElementById('connect-twitch-button').classList.add('dark-border')
              // icon go dark
              document.getElementById('twitch-button-wrap').classList.add('dark-color')
          } else {
              document.getElementById('twitch-button-wrap').classList.add('light-color')
          }
        },
    }
}
</script>

<style>
.mode-icon-twitch {
  padding: 0 0.5em;
  }
.button-inner-twitch {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>