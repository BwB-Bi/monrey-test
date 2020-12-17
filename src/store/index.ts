import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state, n: number){
      state.count+=n
    }
  },
  actions: {
  },
  modules: {
  }
})

console.log(store.state.count);

store.commit('increment',10)

console.log(store.state.count);

export default  store;