import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(Router)

const store=new Vuex.store({
   state:{
      counter:1000
   },
   mutations:{},
   actions:{},
   getters:{},
   modules:{}
})

export default store