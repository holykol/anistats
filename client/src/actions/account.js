import axios from 'axios'

export async function login(username, password) {
   const options = { 
      method: 'POST',
      url: 'http://localhost:8081/auth/login',
      data: {
      	username,
      	password,
      },
   }
   return await axios(options)
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

   return await axios(options)
}