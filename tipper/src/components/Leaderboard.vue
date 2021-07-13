<template>
  <div id="leaderboards-root">
      <Nav />
      <div id="lb-join-prompt" v-if="showLeaderboards" :style="[
            lightmode ? {backgroundColor: 'rgb(100, 65, 164, 0.6)', transition: 'all 750ms linear'} : {backgroundColor: 'rgb(32,28,43, 0.6)', transition: 'all 750ms linear'}
        ]">
            <div>Want to join our streamers?</div>
            <TwitchConnect />
      </div>
      <table id="leaderboard" v-if="showLeaderboards" :style="[
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
            lightmode: this.$store.state.lightmode,
            showLeaderboards: false
        }
    },
    watch: {
        items(newVal, oldVal) {
            if (newVal !== oldVal) this.showLeaderboards = true
        }
    },
    mounted() {
        this.$apollo.subscribe.subStreamers
        document.title = 'Leaderboard'
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
    /* Mobile portrait styles & general styles */
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
        width: 75vw;
        position: relative;
        z-index: 10;
        max-height: 300px;
        overflow-y: scroll;        
    }
    #lb-join-prompt {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-bottom: 2em;
        z-index: 10;
        font-size: 1.3rem;
    }
    td, th {
        text-align: left;
    }
    th {
        font-size: 1.1rem;
    }
    /* mobile landscape styles*/
    @media screen and (orientation:landscape)
    and (min-device-width: 640px) 
    and (max-device-width: 869px)
    and (min-device-height: 319px)
    and (max-device-height: 450px) {
        #leaderboard {
            height: 40vh;
            width: 50vw; 
            max-height: 180px;       
        }
    }
    /* tablet styles */
    @media screen 
    and (min-width: 601px) 
    and (max-width: 1280px)
    and (min-height: 601px) 
    and (max-height: 1280px) {
        #leaderboard {
            height: 60vh;
            width: 55vw;
            max-height: 400px;
        }
        #lb-join-prompt {
            font-size: 1.5rem;
        }
    }
    /* desktop styles */
    @media screen and (min-width: 1200px) and (min-height: 768px) {
        #lb-join-prompt {
            font-size: 2rem;
        }
        th, table tr td:nth-child(2) {
            text-align: center;
        }
        table thead tr th:nth-child(1) {
            text-align: left;
        }
        th {
            font-size: 1.25rem;
        }
        td {
            font-size: 1.15rem;
        }
        #leaderboard {
            height: 60vh;
            width: 55vw;
            max-height: 400px;
        }
    }
    @media screen and (min-width: 1600px) {
        #leaderboard {
            width: 45vw;
        }
    }
</style>