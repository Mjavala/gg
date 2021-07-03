<template>
    <div id="select-wrap" :style="[
            lightmode ? {color: '#e5e3e8'} : {color: '#c32aff'}
            ]">
        <div class="select-prompt">Select a token.</div>
        <select class="select" v-model="selected" :style="[
            lightmode ? {borderColor: '#201c2b !important', color: '#201c2b'} : { borderColor: '#c32aff !important', color: '#c32aff'}
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
                    address: 'wanted'
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
        if (newVal !== oldVal) this.$store.commit('changeSelectedToken', newVal.address)
      }
    }
    
}
</script>

<style>
    #select-wrap {
      padding-top: 1em;
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
.select-prompt {
    padding-bottom: 0.5em;
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
  padding: 1em;
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