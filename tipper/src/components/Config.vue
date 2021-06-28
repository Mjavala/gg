<template>
    <div>
        <div id="root">
            <div class="config-prompt">
                In order to recieve tips, you'll need to add your metamask address. <br />
            </div>
            <div class="wrapper">
                <input class="input" placeholder="Enter your address here" type="text" v-model="address">
            </div>
        <button id="submit-button" type="submit" class="outline purple-white" @click="setAddress()">
            <div v-if="!loading" class="config-button-inner">
                Submit
            </div>
        </button>
        </div>
        <div v-if="errored" class="config-prompt error-styles">Looks like this address format is incorrect.</div>
    </div>
</template>

<script>
import { ethers } from "ethers";

window.Twitch.ext.configuration.onChanged(() => {
  var broadcaster = window.Twitch.ext.configuration.broadcaster;
  if (broadcaster) {
    if (broadcaster.content) {
      var config = {};
      try {
          config = JSON.parse(broadcaster.content);
            this.$store.commit('changeBroadcasterAddress', config.address)
            window.Twitch.ext.rig.log('Reading address from store', this.$store.state.broadcasterAddress);
      } catch (e) {
          console.log(e);
      }
    }
  }})
 
export default {
    data() {
        return {
            address: '',
            errored: false,
            loading: false
        }
    },
    async beforeMount () {
        await window.Twitch.ext.onAuthorized((auth) => {
        this.token = auth.token
        this.channelId = auth.channelId
        this.clientId = auth.clientId
        //window.Twitch.ext.rig.log('The JWT that will be passed to the EBS is', auth.token);
        //window.Twitch.ext.rig.log('The channel ID is', auth.channelId);
        })
    },
    methods: {
        setAddress() {
            let array = []
            if (ethers.utils.isAddress(this.address)) {
                this.callBackendFunction()
            }
            else {
                this.errored = true

            }
        },
        callBackendFunction() {
            const data = {address: this.address}
            try {
                //const data = {'hello': 'world'}
                this.axios.post('http://localhost:3000/config', data, {
                headers: {
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
                }
                }).then(res => {
                    console.log('config res' + ' ' + res)
                })
                //window.Twitch.ext.rig.log(result)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>

.config-prompt {
    color: #6441A4;
    font-size: 14px;
    padding-bottom: 1em;
    padding-top: 1em;

}

#submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    padding-top: 1em;
    border-color: #664e96;
}
.config-button-inner {
    color: #664e96;
}
.error-styles {
    color: #8b0000;
}
.wrapper {
  background-color: transparent;
  padding-bottom: 1em;
}

.input {
  background-color: transparent;
  color: #6441A4;
  border-radius: 15px;
  box-sizing: border-box;
  font-size: 16px;
  width: 318px;
  text-align: center;
}
.input:focus {
  outline: none;
}

</style>