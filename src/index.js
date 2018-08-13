import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'

import './simperium/simperium'

import store from './store/index.js'
import smpr from './simperium/simperium'

import router from './router.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

console.log(process.env.NODE_ENV)
console.log(process.env.SIMPERIUM_APP_ID)
console.log(process.env.SIMPERIUM_API_KEY)

try {
	if (store.getters.isAuthorized) {
		smpr.setUser(store.state.account.user.access_token)
	}
}
catch (e) {
	console.error(e)
}

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
})