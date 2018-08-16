import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'

import store from './store/index.js'
import smpr from './simperium/simperium'

import router from './router.js'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

if (store.getters.isAuthorized) {
	try {
	   smpr.setUser(store.state.account.user.access_token)
	} 
	catch (e) {
	   console.error(e)
	}
}

new Vue({ // eslint-disable-line no-new
   el: '#app',
   store,
   router,
   render: h => h(App),
})
