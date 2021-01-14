import Vue from 'vue'
import Vuex from 'vuex'
import review from './review'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    review
  }
})
