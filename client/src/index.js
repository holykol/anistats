import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'

import './simperium/simperium'

import store from './store/index.js'
import router from './router.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

// let myPlugin = {
// 	install: (Vue) => {
// 		console.log('hello')
// 		Vue.prototype.$simperium = new Smpr()
// 	}
// }


// Vue.use(myPlugin)

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
})
