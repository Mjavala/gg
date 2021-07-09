<template>
    <div id="onboard-root">
        <Nav :lightmode="lightmode"/>
        <div id="onboard-inner-wrap" :style="[
      lightmode ? {backgroundColor: 'rgb(100, 65, 164, 0.5)', transition: 'all 750ms linear'} : {backgroundColor: 'rgb(32,28,43, 0.5)', transition: 'all 750ms linear'}
    ]">
            <div class="greeting">
                Hello {{this.username}}
            </div>
            <div id="streamer-viewer-prompt">
                <div class="prompt">
                    Streamer? <input class="checkbox" type="checkbox" @click="handleStreamer()" />
                </div>
                <div class="prompt">
                    Viewer? <input class="checkbox" type="checkbox" @click="handleUser()" />
                </div>
            </div>
            <div id="onboard-tip-input-inner-wrap">
                <input id="address-input" v-model="input" type="text" class="onboard-input" placeholder="Enter your address" :style="[
                    lightmode ? {borderColor: '#e5e3e8', color: '#e5e3e8'} : {borderColor: '#c32aff', color: '#e5e3e8'}
                    ]"/>
            </div>
            <!--Submit data to backend  -->
            <button id="connect-button" type="submit" class="outline purple-white" @click="submitHandler()" :style="[
                lightmode ? {borderColor: '#e5e3e8'} : {borderColor: '#c32aff !important'}
                ]"
            >
            <div v-if="!loading" class="button-inner">
                Submit
            </div>
            <div id="button-wrap" class="button-inner" :style="[
                lightmode ? {color: '#e5e3e8'} : {color: '#c32aff'}
                ]">
                <font-awesome-icon class="loader" v-if="loading" icon="spinner" size="lg"/>
            </div>
            </button>
        </div>
    </div>
</template>

<script>
import { ethers } from "ethers";
import Nav from './Header.vue'
import jwt_decode from "jwt-decode";

export default {
    components: {
        Nav
    },
    data() {
        return {
            username: '',
            userId: '',
            lightmode: this.$store.state.lightmode,
            loading: false,
            input: '',
            streamer: false,
            user: false,
            address: ''
        }
    },
    mounted() {
        document.title = 'Onboarding'
        this.addressInput = document.getElementById('address-input')
    },
    created() {
        let token
        try {
            token = String(this.$route.hash).split('=')[1]
        } catch (e) {
            console.log(e)
        }
        token = jwt_decode(token)
        this.username = token.preferred_username
        this.userId = token.sub
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'changeMode') this.lightmode = state.lightmode
        })
    },
    watch: {
        input(newVal) {
            if (newVal === '') {
                this.addressInput.classList.remove('input-error')
                return
            }
            if (!ethers.utils.isAddress(newVal)) {
                this.addressInput.classList.add('input-error')
                return
            } else {
                addressInput.classList.remove('input-error')
                this.address = newVal
            }
        }
    },
    methods: {
        handleStreamer() {
            this.streamer = !this.streamer
        },
        handleUser() {
            this.user = !this.user
        },
        submitHandler() {
            console.log(this.address, this.user, this.streamer, this.username, this.userId)
        }
    }
}
</script>

<style>
#onboard-root {
    height: 100vh;
    width: 100vw;
}
#onboard-inner-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 10;
}
#streamer-viewer-prompt {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: max-content;
    width: 50vw;
}
#onboard-tip-input-inner-wrap {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1em;
}
.greeting {
    font-size: 2.5rem;
    color: white;
    padding: 1em 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.prompt {
    font-size: 1.5rem;
    color: white;
    padding: 1em 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.checkbox {
    margin-left: 1em;
}
</style>