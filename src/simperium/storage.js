import store from '../store/index'

export default function() {
   return new CustomBucketStore()
}

class CustomBucketStore {
   get(id, callback) {
      // console.log('Storage get')
      callback(store.state.titles[id])
   }

   update(id, object, isIndexing, callback) {
      // console.log('Storage update')
      store.commit('updateItem', {
         id,
         data: object,
      })
      callback(null, {
         id,
         data: object,
         isIndexing,
      })
   }

   remove(id, callback) {
      // console.log('Storage remove')
      store.commit('removeItem', id)
      callback(null)
   }

   // TODO: build a query interface
   find(query, callback) {
      // console.log('Storage find')
      var objects = []
      var key
      for (key in store.state.titles) {
         objects.push({ id: key, data: this.objects[key] })
      }
      callback(null, objects)
   }
}
