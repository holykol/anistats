import axios from 'axios'
import smpr from '../simperium/simperium'


export async function login(username, password) {
   const options = { 
      method: 'POST',
      url: 'http://localhost:8081/auth/login',
      data: {
      	username,
      	password,
      },
   }
   const res = await axios(options)
   smpr.setUser(res.data.access_token)
   return res
}

export async function register(username, password) {
   const options = { 
      method: 'POST',
      url: 'http://localhost:8081/auth/register',
     	data: {
      	username,
      	password,
      },
   }

   const res = await axios(options)
   smpr.setUser(res.data.access_token)
   return res
}

export async function logout() {
   smpr.deauthorize()
}