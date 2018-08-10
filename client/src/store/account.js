const state = {
   user: null
}

// getters
const getters = {
   isLogged(state) {
      if (state.user === null) {
         return false
      }
      // if (state.user.user) {}
      return true
   },
}
// mutations
const mutations = {
   login(state, user) {
      state.user = user
   },
   logout(state) {
      state.user = null
   },
}

const actions = {
   logout(store) {
      store.commit('logout')
   },
}

export default {
   state,
   getters,
   mutations,
   actions,
}