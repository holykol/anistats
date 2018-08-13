import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import account from './account'
import titles from './titles'

Vue.use(Vuex)

var store = new Vuex.Store({
	modules: {
		account,
		titles,
	}
})

export default store