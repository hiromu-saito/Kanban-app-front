import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ErrorBoundary from './ErrorBoundary'

Vue.config.productionTip = false

Vue.component(ErrorBoundary.name, ErrorBoundary)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
