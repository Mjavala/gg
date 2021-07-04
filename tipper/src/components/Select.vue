<template>
    <div id="select-wrap" :style="[
            lightmode ? {color: '#e5e3e8'} : {color: '#c32aff'}
            ]">
        <div class="select-prompt">Select a token</div>
        <select class="select" v-model="selected" :style="[
            lightmode ? {borderColor: '#e5e3e8 !important', color: '#e5e3e8'} : { borderColor: '#c32aff !important', color: '#c32aff'}
            ]">
            <option :value="item" :key="index" v-for="(item, index) in items">{{item.name}}</option>
        </select>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selected: 'ONE',
            items: [
                {
                    name: 'ONE',
                    address: null // native token
                },
                {
                    name: 'GG',
                    address: 'wanted'
                }
            ],
            lightmode: this.$store.state.lightmode
        }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'changeMode') {
          this.lightmode = state.lightmode
        }
      })
    },
    watch: {
      selected(newVal, oldVal) {
        if (newVal !== oldVal)  this.$store.commit('changeSelectedToken', newVal)
      }
    }
    
}
</script>