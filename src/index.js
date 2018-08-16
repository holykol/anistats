import Vue from 'vue'

import Vuelidate from 'vuelidate'

import { Card, Dropdown, Modal, Nav, FormInput } from 'bootstrap-vue/es/components'

import App from './App.vue'

import store from './store/index.js'
import smpr from './simperium/simperium'

import router from './router.js'

Vue.use(Card)
Vue.use(Dropdown)
Vue.use(Modal)
Vue.use(Nav)
Vue.use(FormInput)

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
