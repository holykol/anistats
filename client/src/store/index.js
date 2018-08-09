import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'


Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
    	data: []
	},
	mutations: {
		// Инициализация хранилища
		init(state, data) {
			state.data = data
		},

		addItem(state, obj) {
			state.data.unshift(obj)
		},

		deleteItem(state, id) {
			state.data = state.data.filter(function(el){
				return el.id !== id
			})
		},

		updateItem(state, obj) {
			state.data = state.data.map(function(el){
				if (el.id === obj.id) {
					el = obj
				}
				return el
			})
		},
	},
	actions: {
		async addItem({ commit }, obj) {
			const { data } = await axios.post('http://localhost:8081/', obj)

			if (data.success) {
				obj.id = data.id
				commit('addItem', obj)
			}	
		},
		async deleteItem(store, id) {
			const { data } = await axios.delete('http://localhost:8081/' + id)
			
			if (data.success) {
				store.commit('deleteItem', id)
			}	
		},
		async updateItem(store, obj) {
			const { data } = await axios.put('http://localhost:8081/' + obj.id, obj)
			
			if (data.success) {
				store.commit('updateItem', obj)
			}
		}
	},
	getters: {
		episodesCount(state) {
			let count = 0
			state.data.forEach((el) => {
				count += Number(el.episodes)
			})
			return count
		},
		reversedItems(state) {
			return state.data
		}
	}
})

export default store