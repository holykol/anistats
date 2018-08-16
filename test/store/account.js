import { expect } from 'chai'
import sinon from 'sinon'

import account from '../../src/store/account'

describe('Store account', function() {
  	describe('getters', function() {
    	it('isAuthorized', function() {
      	let state = {
      		user: {
      			username: 'admin',
      			access_token: '12345',
      			user_id: '1',
      		},
      	}

      	expect(account.getters.isAuthorized(state)).to.be.true
      	expect(account.getters.isAuthorized({ user: null })).to.be.false
    	})
  	})

  	describe('mutations', function() {
    	it('login', function() {
      	let state = {
      		user: null,
      	}

      	let user = {
      		username: 'admin',
      		user_id: '1',
      	}

      	account.mutations.login(state, user)

      	expect(state.user).to.deep.equal(user)
    	})

    	it('logout', function() {
      	let state = {
      		user: {
	      		username: 'admin',
	      		user_id: '1',
      		},
      	}

      	account.mutations.logout(state)

      	expect(state.user).to.equal(null)
    	})
  	})

  	describe('actions', function() {
    	it('logout', function() {
    		let fake = sinon.fake()

    		let store = {
    			commit: fake,
    		}

    		account.actions.logout(store)
    		expect(fake.args[0][0]).to.equal('logout')
    		expect(fake.called).to.be.true
    	})
  	})
})