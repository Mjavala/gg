<template>
    <div id="onboard-root">
        <Nav />
        <div id="onboard-inner-wrap" :style="[
            lightmode ? {backgroundColor: 'rgb(100, 65, 164, 0.5)', transition: 'all 750ms linear'} : {backgroundColor: 'rgb(32,28,43, 0.5)', transition: 'all 750ms linear'}
        ]">
            <div v-if="!loading" class="greeting">
                {{greeting}}
            </div>
            <div v-if="!loading" id="streamer-viewer-prompt">
                <div class="prompt">
                    Streamer? <input class="checkbox" type="checkbox" @click="handleStreamer()" />
                </div>
                <div class="prompt">
                    Viewer? <input class="checkbox" type="checkbox" @click="handleUser()" />
                </div>
            </div>
            <div v-if="!loading" id="onboard-tip-input-inner-wrap">
                <input id="address-input" v-model="input" type="text" class="onboard-input" placeholder="Enter your address" :style="[
                    lightmode ? {borderColor: '#e5e3e8', color: '#e5e3e8'} : {borderColor: '#c32aff', color: '#e5e3e8'}
                    ]"/>
            </div>
            <!--Submit data to backend  -->
            <button v-if="!loading" id="connect-button" type="submit" class="outline purple-white" @click="submitHandler()" :style="[
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
            <Loader v-if="loading" />
        </div>
    </div>
</template>

<script>
import { ethers } from "ethers";
import Nav from './Header.vue'
import jwt_decode from "jwt-decode";
import gql from 'graphql-tag'
import Loader from './Loader.vue'

export default {
    components: {
        Nav,
        Loader
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
            address: '',
            errored: false,
            greeting: 'Hello',
            loading: false
        }
    },
    mounted() {
        document.title = 'Onboarding'
        this.addressInput = document.getElementById('address-input')
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'changeMode') this.lightmode = state.lightmode
        })
        // decode token if exists
        if (this.$route.hash !== '') this.decodeToken()
        else this.errored = true
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
                this.addressInput.classList.remove('input-error')
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
            if (!ethers.utils.isAddress(this.address)) {
                console.log('invalid streamer address')
                return
            }
            if (this.errored) return
            this.loading = true
            if (this.streamer) {
                this.$apollo.mutate({
                    mutation: gql `mutation ($username: String!, $sub: String!, $address: String!) {
                        insert_streamers_one(object: {address: $address, sub: $sub, tips: 0, username: $username}) {
                            id
                        }
                    }`,
                    variables: {
                        username: this.username,
                        sub: this.userId,
                        address: this.address
                    }
                })
            }
            if (this.user) {
                this.$apollo.mutate({
                    mutation: gql `mutation ($username: String!, $sub: String!, $address: String!) {
                        insert_viewers_one(object: {address: $address, sub: $sub, rewards: 0, username: $username}) {
                            id
                        }
                    }`,
                    variables: {
                        username: this.username,
                        sub: this.userId,
                        address: this.address
                    }
                })
            }
             setTimeout(() => {
                this.greeting = 'Success! You are done here for now.'
                this.loading = false    
             }, 2000);
        },
        decodeToken() {
            let token
            try {
                token = String(this.$route.hash).split('=')[1]
            } catch (e) {
                console.log(e)
            }
            token = jwt_decode(token)
            this.username = token.preferred_username
            this.greeting = `Hello ${this.username}`
            this.userId = token.sub
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
    overflow-y: scroll;
}
#streamer-viewer-prompt {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: max-content;
    width: 80vw;
}
#onboard-tip-input-inner-wrap {
    width: 80vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1em;
}
#submit-feedback-wrap {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.greeting {
    font-size: 1.5rem;
    color: white;
    padding: 1em 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.prompt {
    font-size: 1rem;
    color: white;
    padding: 1em 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.checkbox {
    margin-left: 1em;
}
/* Desktop Styles */
@media screen and (min-width: 1200px) and (min-height: 768px) {
    .greeting {
        font-size: 2rem;
    }
    .prompt {
        font-size: 1.5rem;
    }
    #onboard-tip-input-inner-wrap, #streamer-viewer-prompt {
        width: 65vw;
    }
}
/* Desktop Styles */
@media screen and (min-width: 1900px) {
    #onboard-tip-input-inner-wrap, #streamer-viewer-prompt {
        width: 50vw;
    }
}
</style>