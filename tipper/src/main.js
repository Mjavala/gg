import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt, faSpinner, faEnvelope, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

library.add(faExternalLinkAlt)
library.add(faSpinner)
library.add(faDiscord)
library.add(faEnvelope)
library.add(faMoon)
library.add(faSun)
library.add(faTwitch)


const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://www.talkuppity.tk/hasura/v1/graphql',
  request: operation => {
    operation.setContext({ headers: {'x-hasura-admin-secret': 'myadminsecretkey'}})
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios)
Vue.use(VueApollo)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
