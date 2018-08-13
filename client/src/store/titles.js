import Vue from 'vue'

const state = {
	data: {}
}

const mutations = {
	updateItem(state, {id, data}) {
		// console.log('Storage update')

		// Set state property to make it reactive
		// https://vuejs.org/v2/api/#Vue-set 
		Vue.set(state.data, id, data);
	},

	removeItem(state, id) {
		// console.log('Storage remove')
		Vue.delete(state.data, id);
	},

	clearItems(state) {
		state.data = {}
	}
}

const actions = {
	logout({ commit }) {
		commit('clearItems')
		commit('logout')
	}
}

const getters = {
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
   }
}

export default {
	actions,
	mutations,
	getters,
	state,
}