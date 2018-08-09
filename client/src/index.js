import Vue from 'vue'
import App from './components/App.vue'
import axios from 'axios'
import store from './store/index.js'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

new Vue({
	el: '#app',
	store,
	render: h => h(App),
})
