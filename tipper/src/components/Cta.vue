<template>
        <div class="message-wrap">
            <div class="message">
                New to Crypto? 
            </div>
            <div class="onboard-wrap" :style="[
                lightmode ? {color: '#201c2b !important'} : {color: '#c32aff !important'}
                ]">
                <font-awesome-icon icon="external-link-alt" size="xs"/>
            </div>
        </div>
</template>

<script>
export default {
    props: ['lightmode']
}
</script>

<style scoped>
  .onboard-wrap {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>