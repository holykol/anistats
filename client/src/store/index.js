import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import createPersistedState from 'vuex-persistedstate'

import account from './account'
import titles from './titles'

Vue.use(Vuex)

var store = new Vuex.Store({
	modules: {
		account,
		titles,
	},
	plugins: [
		createPersistedState({
			paths: ['account']
		})
	]

})

export default store