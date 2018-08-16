import { expect } from 'chai'
import sinon from 'sinon'

import { getters, actions, mutations } from '../../src/store/titles'


describe('Store titles', function() {
   const clearState = {
      data: {},
   }

   let state

   beforeEach(function() {
      state = {
         data: {
            'id1': {
               title: 'Hello world',
               episodes: 12,
               url: '',
               createdAt: 1534443986174,
               updatedAt: 1534444001572,
            },
            'id2': {
               title: 'Hello mom',
               episodes: 7,
               url: 'https://example.com',
               createdAt: 1534444051428,
               updatedAt: 1534444064844,
            },
            'id3': {
               title: 'Hello dad',
               episodes: 13,
               url: '',
               createdAt: 1534444052003,
               updatedAt: 1534444065172,
            },
         },
      }
   });

  	describe('getters', function() {


      it('titlesCount', function() {
         expect(getters.titlesCount(state)).to.equal(3)


         expect(getters.titlesCount(clearState)).to.equal(0)
      })

    	it('episodesCount', function() {
      	expect(getters.episodesCount(state)).to.equal(32)


         expect(getters.episodesCount(clearState)).to.equal(0)
    	})

      it('sortedItems', function() {
         let keys = Object.keys(getters.sortedItems(state))
         expect(keys.length).to.equal(3)
         expect(keys).to.eql(['id3', 'id2', 'id1'])


         expect(getters.sortedItems(clearState)).to.deep.equal({})
      })
  	})

  	describe('mutations', function() {
      it('updateItem', function() {
         const newItem = {
            title: 'Hello mom!!',
            episodes: 8,
            url: 'https://example.com',
            createdAt: 1534444051428,
            updatedAt: 1534445267812,
         }

         mutations.updateItem(state, {
            id: 'id2',
            data: newItem,
         })

         expect(state.data['id2']).to.deep.equal(newItem)
      })

      it('removeItem', function() {
         mutations.removeItem(state, 'id3')

         expect(state.data).not.to.have.keys('id3')
         expect(Object.keys(state.data).length).to.equal(2)
      })

    	it('clearItems', function() {
         mutations.clearItems(state)

         expect(state.data).to.deep.equal({})
      })
  	})

  	describe('actions', function() {
    	it('logout', function() {
         let fake = sinon.fake()

         let store = {
            commit: fake,
         }

         actions.logout(store)

         expect(fake.args).to.deep.have.members([['logout'], ['clearItems']])

         expect(fake.callCount).to.equal(2)
      })
  	})
})