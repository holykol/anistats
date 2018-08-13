import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'

import store from './store/index.js'
import smpr from './simperium/simperium'

import router from './router.js'

Vue.use(BootstrapVue)

try {
   if (store.getters.isAuthorized) {
      smpr.setUser(store.state.account.user.access_token)
   }
} catch (e) {
   console.error(e)
}

new Vue({ // eslint-disable-line no-new
   el: '#app',
   store,
   router,
   render: h => h(App),
})
