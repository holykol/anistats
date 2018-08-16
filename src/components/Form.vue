<template>
   <div class="wrap">
      <form action="" class="form" @submit.prevent="submit">
         <h3 v-if="isLogin" class="pb-3" >Login / <router-link to="/join">Join</router-link></h3>
         <h3 v-else class="pb-3"><router-link to="/login">Login</router-link> / Join</h3>

         <div class="form-group">
            <b-form-input type="email" v-model="username" class="form-control" placeholder="Email" :state="($v.username.$error) ? false : null"/>
            <div class="invalid-feedback" v-if="!$v.username.required">This field is required</div>
            <div class="invalid-feedback" v-if="!$v.username.email">Enter valid email</div>
         </div>
         <div class="form-group">
            <b-form-input type="password" v-model="password" class="form-control" placeholder="Password" :state="($v.password.$error) ? false : null"/>
            <div class="invalid-feedback" v-if="!$v.password.required">This field is required</div>            
         </div>
         <div class="form-group">
            <button type="submit" class="btn btn-primary w-100" :disabled="working">{{(isLogin) ? 'Login' : 'Create account'}}</button>
            <p class="text-danger error pt-2" v-if="error">{{error}}</p>
         </div>
         <div class="form-group">
            <p class="text-muted">Your data is being processed by <a href="https://simperium.com">Simperium</a></p>
         </div>
      </form>
   </div>
</template>

<script>
   import { register, login } from '../actions/account'
   import { required, email } from 'vuelidate/lib/validators'


   export default {
      name: 'Form',
      data() {
         return {
            username: null,
            password: null,
            error: null,
            working: false,
         }
      },
      props: ['isLogin'],
      validations: {
         username: {
            required,
            email,
         },
         password: {
            required,
         }
      },
      methods: {
         async submit(e) {
            try {
            	this.error = null
               this.$v.$touch()

               if (this.$v.$invalid) {
                  return
               }

               this.working = true

               let res

               if (this.isLogin) {
            		res = await login(this.username, this.password)
               }
               else {
               	res = await register(this.username, this.password)
               }
               
               this.$store.commit('login', res.data)
               this.$router.push('/')

            } catch (e) {
               this.working = false
               this.error = (e.response.data) ? e.response.data : e.message
            }
         },
      },
   }
</script>

<style type="text/css" scoped>
   .wrap {
      display: flex;
      justify-content: center;
      padding-top: 40px;
      padding-bottom: 40px;
      align-items: center;
   }
   .form {
      width: 100%;
      max-width: 290px;
      margin: 0 auto;
   }
   .text-muted, .error {
      font-size: 80%;
   }
</style>
