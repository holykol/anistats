import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'

import store from './store/index.js'
import router from './router.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
})
