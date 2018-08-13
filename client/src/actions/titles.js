
import store from '../store/index'
import smpr from '../'

export async function add(object) {
   console.log('update')
   return smpr.add(object)
}

export async function update(id, object) {
   console.log('update')
}

// Remove item
export async function remove(id) {
   console.log('remove')
}

