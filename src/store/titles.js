import Vue from 'vue'

export const state = {
   data: {},
}

export const getters = {
   episodesCount(state) {
      let count = 0
      for (let key in state.data) {
         count += Number(state.data[key].episodes)
      }
      return count
   },
   titlesCount(state) {
      const keys = Object.keys(state.data)
      return keys.length
   },

   sortedItems(state) {
      const sorted = Object.keys(state.data).sort((id1, id2) => {
         const a = state.data[id1].createdAt
         const b = state.data[id2].createdAt

         return a > b ? -1 : a < b ? 1 : 0
      })

      const result = {}
      sorted.forEach((el) => {
         result[el] = state.data[el]
      })

      return result
   },
}

export const mutations = {
   updateItem(state, {id, data}) {
      // console.log('Storage update')

      // Set state property to make it reactive
      // https://vuejs.org/v2/api/#Vue-set
      Vue.set(state.data, id, data)
   },

   removeItem(state, id) {
      // console.log('Storage remove')
      Vue.delete(state.data, id)
   },

   clearItems(state) {
      state.data = {}
   },
}

export const actions = {
   logout({ commit }) {
      commit('clearItems')
      commit('logout')
   },
}


export default {
   actions,
   mutations,
   getters,
   state,
}
