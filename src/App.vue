<template>
   <div id="app">
      <nav class="navbar navbar-light bg-light">
         <router-link class="navbar-brand mr-auto" to="/"><b>AniStats</b></router-link>

         <b-nav-item-dropdown v-if="$store.getters.isAuthorized" right>
            <span slot="button-content">
               <img :src="avatarUrl" class="avatar mr-1" alt="avatar"/>
               <span>{{$store.state.account.user.username}}</span>
            </span>
            <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
         </b-nav-item-dropdown>


         <!-- <div v-if="$store.getters.isAuthorized">
            <img :src="avatarUrl" id="avatar" alt="avatar"/>
            <span class="navbar-text" v></span>
         </div>
          -->
      </nav>
      <div class="container">
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import md5 from 'md5'

import { logout } from './actions/account'

export default {
   name: 'App',
   methods: {
      logout () {
         this.$router.push('/login')
         logout()
         this.$store.dispatch('logout')
      },
   },
   computed: {
      avatarUrl () {
         if (this.$store.getters.isAuthorized) {
            const hash = md5(this.$store.state.account.user.username)
            return `https://www.gravatar.com/avatar/${hash}?s=50&d=retro`
         }
         return null
      },
   },
}


</script>

<style>
   .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
   }

   .dropdown {
      list-style: none;
   }

   .navbar {
      padding: 0.1rem 1rem;
   }
</style>
