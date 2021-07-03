<template>
    <div id="header-wrap">
        <div id="theme-toggle">
            <div class="mode-icons" @click="toggleDarkMode()" v-if="lightmode" :style="[
                lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                ]"
            >
                <font-awesome-icon :icon="{ prefix: 'fa', iconName: 'moon' }" />
            </div>
            <div class="mode-icons" @click="toggleLightMode()" v-if="!lightmode" :style="[
                lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                ]"
            >
                <font-awesome-icon  :icon="{ prefix: 'fa', iconName: 'sun' }" />
            </div>
        </div>
        <div id="nav-spacer"></div>
        <div id="socials-wrap">
            <a href="mailto:geriatricsgaming@gmail.com" target="_blank">
                <div :style="[
                    lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                    ]"
                >
                    <font-awesome-icon :icon="{ prefix: 'fa', iconName: 'envelope' }" />
                </div>
            </a>
            <a href="https://discord.gg/w23cY5dH" target="_blank">
                <div :style="[
                    lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                    ]"
                >
                    <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'discord' }" />
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
        },
        toggleLightMode() {
            this.$store.commit('changeMode', true)
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
    }
    #socials-wrap {
        display: flex;
        height: 100%;
        width: 25%;
        justify-content: space-evenly;
        align-items: center;
    }
    #nav-spacer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65%;
    }
    .mode-icons {
        cursor: pointer;
        z-index: 10;
    }
</style>