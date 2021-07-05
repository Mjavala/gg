<template>
    <div id="header-wrap">
        <img id="logo" src="@/assets/gg_logo.png" alt="">
        <div id="nav-spacer"></div>
        <div id="theme-toggle">
            <div class="mode-icons" @click="toggleDarkMode()" v-if="lightmode" :style="[
                lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                ]"
            >
                <font-awesome-icon class="mode-icon" :icon="{ prefix: 'fa', iconName: 'moon' }" />
            </div>
            <div class="mode-icons" @click="toggleLightMode()" v-if="!lightmode" :style="[
                lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                ]"
            >
                <font-awesome-icon  class="mode-icon" :icon="{ prefix: 'fa', iconName: 'sun' }" />
            </div>
        </div>
        <div id="socials-wrap">
            <a href="mailto:geriatricsgaming@gmail.com" target="_blank">
                <div :style="[
                    lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                    ]"
                >
                    <font-awesome-icon class="mode-icon" :icon="{ prefix: 'fa', iconName: 'envelope' }" />
                </div>
            </a>
            <a href="https://discord.gg/w23cY5dH" target="_blank">
                <div :style="[
                    lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                    ]"
                >
                    <font-awesome-icon class="mode-icon" :icon="{ prefix: 'fab', iconName: 'discord' }" />
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['lightmode'],
    methods: {
        toggleDarkMode() {
            this.$store.commit('changeMode', false)
            window.localStorage.setItem('lightmode', false)
        },
        toggleLightMode() {
            this.$store.commit('changeMode', true)
            window.localStorage.setItem('lightmode', true)
        }
    }
}
</script>

<style>
    #header-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: transparent;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        z-index: 15;
    }
    #socials-wrap {
        display: flex;
        height: 100%;
        width: 50%;
        justify-content: space-evenly;
        align-items: center;
    }
    #nav-spacer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    #logo {
        position: absolute;
        top: 0;
        left: -1em;
        max-height: 150%;
    }
    .mode-icons {
        cursor: pointer;
        z-index: 10;
    }
    /* mobile landscape styles*/
    @media screen and (orientation:landscape)
    and (min-device-width: 640px) 
    and (max-device-width: 869px)
    and (min-device-height: 319px)
    and (max-device-height: 450px) {
        #logo {
            left: -1em;
            max-height: 175%;
        }
        #socials-wrap {
            width: 25%;
        }
    }
    @media screen and (min-width: 601px) and (min-height: 601px) {
        #logo {
            max-height: 200%;
        }
    }
    @media screen and (min-width: 800px) {
        #socials-wrap {
            width: 25%;
        }
    }
    @media screen and (min-width: 1000px) {
        .mode-icon {
            width: 22px !important;
            height: 18px !important;
        }
    }
    /* desktop  styles */
    @media screen and (min-width: 1200px) {
        #socials-wrap {
            width: 20%;
        }
        .mode-icon {
            width: 24px !important;
            height: 20px !important;
        }
    }
    /* desktop  styles */
    @media screen and (min-width: 1600px) {
        .mode-icon {
            width: 26px !important;
            height: 22px !important;
        }
        #header-wrap {
            height: 75px;
        }
    }
</style>