import Vue from 'vue'
import VueRouter from 'vue-router'

import index from './pages/index'
import login from './pages/login'
import register from './pages/register'

import store from './store/index'

const routes = [
  	{ 
		path: '/', 
  		name: 'index', 
  		component: index,
  		meta: { 
  			requiresAuth: true,
  		},
  	},
	{ 
		path: '/login', 
		name: 'login', 
		component: login,
		meta: { 
			requiresAuth: false, 
		},
	},
	{ 
		path: '/register', 
		name: 'register', 
		component: register, 
		meta: { 
			requiresAuth: false,
		},
	},
]

const router = new VueRouter({
	mode: 'history',
	saveScrollPosition: true,
  	routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  	if (to.matched.some(record => record.meta.requiresAuth)) {
    	// this route requires auth, check if logged in
    	// if not, redirect to login page.
    	if (!store.getters.isAuthorized) {
	      next({
	        	path: '/login',
	      })
	 	}
	 	else {
	      next()
	 	}
  	} else {
    	next() // make sure to always call next()!
  	}
})

export default router