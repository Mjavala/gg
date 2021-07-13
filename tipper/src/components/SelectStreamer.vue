<template>
    <div id="select-streamer-wrap" :style="[
            lightmode ? {color: '#e5e3e8'} : {color: '#c32aff'}
            ]">
        <div class="select-prompt">Select a streamer</div>
        <select class="select" v-model="selected" :style="[
            lightmode ? {borderColor: '#e5e3e8 !important', color: '#e5e3e8'} : { borderColor: '#c32aff !important', color: '#c32aff'}
            ]">
            <option :value="item" :key="index" v-for="(item, index) in items">{{item.username}}</option>
        </select>
    </div>
</template>

<script>
export default {
  data () {
      return {
          selected: 'Streamer1',
          lightmode: this.$store.state.lightmode,
          items: this.$store.state.streamersData.map(({ username, address, tips }) => ({username, address, tips}))
      }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeMode') this.lightmode = state.lightmode
    })
  },
  watch: {
    selected(newVal, oldVal) {
      console.log(newVal)
      if (newVal !== oldVal) this.$store.commit('changeSelectedStreamer', newVal)
    }
  }
    
}
</script>

<style>
#select-streamer-wrap, #select-wrap {
    padding-top: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 'all 750ms linear';
}
/* Reset Select */
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
select {
  font-family: 'Comfortaa', cursive !important;
}
.select-wrap {
  position: relative;
}
.select-wrap::after {
  content: "▼";
  font-size: 1rem;
  top: 6px;
  right: 10px;
  position: absolute;
}
/* Custom Select */
.select {
  position: relative;
  display: flex;
  background: transparent;
  overflow: hidden;
  padding: 1em 1em 0.75em 0.25em;
  width: 10em;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-radius: 5px;
}
select {
  flex: 1;
  padding: 0 .5em;
  color: #c32aff;
  cursor: pointer;
}

</style>