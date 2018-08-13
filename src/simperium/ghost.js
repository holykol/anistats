export default function (bucket) {
   return new Store(bucket)
};

export class Store {
   constructor (bucket) {
      // console.log('init')

      this.bucket = bucket
      this.index = {}
   }

   getChangeVersion () {
      return new Promise((resolve) => {
         // console.log('action gcv')
         resolve(this.cv)
      })
   }

   setChangeVersion (cv) {
      return new Promise((resolve) => {
         // console.log('action scv')
         this.cv = cv
         resolve(cv)
      })
   }

   put (id, version, data) {
      return new Promise((resolve) => {
         // console.log('action put')
         this.index[id] = JSON.stringify({version: version, data: data})
         resolve(true)
      })
   }

   get (id) {
      return new Promise((resolve) => {
         // console.log('action get')
         var ghost = this.index[id]
         if (!ghost) {
            ghost = {data: {}}
            ghost.key = id
            this.index[id] = JSON.stringify(ghost)
         } else {
            ghost = JSON.parse(ghost)
         }
         resolve(ghost)
      })
   }

   remove (id) {
      return new Promise((resolve) => {
         // console.log('action remove')
         delete this.index[id]
         resolve()
      })
   }
}
