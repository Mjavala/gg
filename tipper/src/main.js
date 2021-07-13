import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// fortawesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt, faSpinner, faEnvelope, faMoon, faSun, faHome, faUndo } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faExternalLinkAlt)
library.add(faSpinner)
library.add(faDiscord)
library.add(faEnvelope)
library.add(faMoon)
library.add(faSun)
library.add(faTwitch)
library.add(faHome)
library.add(faUndo)



// GraphQL 
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// apollo ws links
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const getHeaders = () => {
  const headers = {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  return headers;
};

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://www.talkuppity.tk/hasura/v1/graphql',
  headers: getHeaders()
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'wss://www.talkuppity.tk/hasura/v1/graphql',
  options: {
    reconnect: true,
    timeout: 300000,
    connectionParams: () => {
      return { headers: getHeaders() }
    }
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueApollo)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
