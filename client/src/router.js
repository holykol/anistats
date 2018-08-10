import Vue from 'vue'
import VueRouter from 'vue-router'

import index from './pages/index'
import login from './pages/login'

const routes = [
  	{ path: '/', name: 'index', component: index },
	{ path: '/login', name: 'login', component: login }
]

const router = new VueRouter({
	mode: 'history',
  	routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
	if (to.name === 'index') {
		next('login')
	}
	next()
})

export default router