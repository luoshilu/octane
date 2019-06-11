import Vue from 'vue'
import App from './App.vue'

import Oct from './index.js'
Vue.use(Oct)

new Vue({
  el: '#app',
  render: h => h(App)
})
