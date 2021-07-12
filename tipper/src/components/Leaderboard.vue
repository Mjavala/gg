<template>
  <div id="leaderboards-root">
      <Nav />
      <table id="leaderboard" :style="[
            lightmode ? {backgroundColor: 'rgb(100, 65, 164, 0.6)', transition: 'all 750ms linear'} : {backgroundColor: 'rgb(32,28,43, 0.6)', transition: 'all 750ms linear'}
        ]">
          <thead id="lb-headers">
              <tr>
                  <th v-for="(column, index) in columns" :key="index"> {{column}}</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td v-for="(column, index) in columns" :key="index">{{item[column]}}</td>
            </tr>
          </tbody>
      </table>
      <div id="lb-join-prompt" :style="[
            lightmode ? {backgroundColor: 'rgb(100, 65, 164, 0.6)', transition: 'all 750ms linear'} : {backgroundColor: 'rgb(32,28,43, 0.6)', transition: 'all 750ms linear'}
        ]">
            <div>Want to join our streamers?</div>
            <TwitchConnect />
      </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Nav from './Header.vue'
import TwitchConnect from './TwitchConnect.vue'

export default {
    components: {
        Nav,
        TwitchConnect
    },
    data () {
        return {
            items: [],
            columns: ['Streamer', 'Tips (GG)'],
            lightmode: this.$store.state.lightmode
        }
    },
    mounted() {
        this.$apollo.subscribe.subStreamers
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'changeMode') this.lightmode = state.lightmode
        })
    },
    apollo: {
        $subscribe: {
            subStreamers: {
                query: gql `subscription subStreamers{
                    streamers (order_by: {tips: desc}) {
                        address
                        id
                        sub
                        tips
                        username
                    }
                }`,
                result ({data}){
                    this.items = data.streamers.map(({username, tips}) => ({Streamer: username, 'Tips (GG)': tips}))
                }
            }
        }
    },
}
</script>

<style>
    #leaderboards-root {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #e5e3e8;
    }
    #leaderboard {
        height: 40vh;
        width: 25vw;
        position: relative;
        z-index: 10;
        
    }
    #lb-join-prompt {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 1em;
        z-index: 10;
    }
    td {
        text-align: center;
    }
</style>