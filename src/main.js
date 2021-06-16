import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ErrorBoundary from './ErrorBoundary'

Vue.config.productionTip = false

Vue.component(ErrorBoundary.name, ErrorBoundary)

Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandler err:', err)
  console.error('errorHandler vm:', vm)
  console.error('errorHandler info:', info)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
