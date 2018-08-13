import Simperium from 'simperium'
import storage from './storage'
import ghost from './ghost'
import store from '../store/index'
import { v4 as uuid } from 'uuid';

class Smpr {
	constructor() {
		this.client = new Simperium(process.env.SIMPERIUM_APP_ID, null, {
			objectStoreProvider: storage,
			//ghostStoreProvider: ghost,
		})

		this.bucket = null
	}

	setUser(token) {
		// todo, set the user access token and have the buckets reconnect
		this.client.setAccessToken(token)
		this.bucket = this.client.bucket('objects')
		this.bucket.on('index', async () => {})
	}

	deauthorize() {
		this.client.disconnect()
		// Prevent errors
		this.client.onClose()
		this.client.setAccessToken(null)
	}

	add(data) {
		return this.bucket.add(data)
	}

	update(id, data) {
		return this.bucket.update(id, data)
	}

	remove(id) {
		return this.bucket.remove(id)
	}
}

export default new Smpr()