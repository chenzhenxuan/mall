import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store '

Vue.config.productionTip = false
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
   store,
  render: h => h(App)
})
