import axios from 'axios'
import smpr from '../simperium/simperium'

export async function login (username, password) {
   const options = {
      method: 'POST',
      url: `https://auth.simperium.com/1/${process.env.SIMPERIUM_APP_ID}/authorize/`,
      headers: {
         'X-Simperium-API-Key': process.env.SIMPERIUM_API_KEY,
      },
      data: {
         username,
         password,
      },
   }
   const res = await axios(options)
   smpr.setUser(res.data.access_token)
   return res
}

export async function register (username, password) {
   const options = {
      method: 'POST',
      url: `https://auth.simperium.com/1/${process.env.SIMPERIUM_APP_ID}/create/`,
      headers: {
         'X-Simperium-API-Key': process.env.SIMPERIUM_API_KEY,
      },
      data: {
         username,
         password,
      },
   }

   const res = await axios(options)
   smpr.setUser(res.data.access_token)
   return res
}

export async function logout () {
   smpr.deauthorize()
}
