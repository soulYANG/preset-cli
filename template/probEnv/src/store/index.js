import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getter'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  userName:''
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

export default store