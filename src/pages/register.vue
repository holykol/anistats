<template>
   <div class="wrap">
      <form action="" class="form" @submit="submit">
         <h3 class="pb-3"><router-link to="/login">Login</router-link> / Регистрация</h3>
         <div class="form-group">
            <input type="email" v-model="username" class="form-control" placeholder="Email">
         </div>
         <div class="form-group">
            <input type="password" v-model="password" class="form-control" placeholder="Password">
         </div>
         <div class="form-group">
            <button type="submit" class="btn btn-primary w-100" :disabled="working">Join</button>
            <p class="text-danger error pt-2" v-if="error">{{error}}</p>
         </div>
         <div class="form-group">
            <p class="text-muted">Your data is being processed by <a href="https://simperium.com">Simperium</a></p>
         </div>
      </form>
   </div>
</template>

<script>
   import { register } from '../actions/account'

   export default {
      name: 'Register',
      data() {
         return {
            username: null,
            password: null,
            error: null,
            working: false,
         }
      },
      methods: {
         async submit(e) {
            e.preventDefault()
            try {
               this.error = null
               this.working = true

               const res = await register(this.username, this.password)

               this.$store.commit('login', res.data)
               this.$router.push('/')
            } catch (e) {
               this.working = false
               this.error = e.response.data || e.message
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
