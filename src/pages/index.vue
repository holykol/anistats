<template>
   <div>
      <div class="row">
         <div class="col col-12 col-md-6 col-custom">
            <div class="card">
               <div class="card-header">Добавить тайтл</div>
               <div class="card-body">
                  <Add></Add>
               </div>
            </div>
         </div>
         <div class="col col-12 col-md-6 col-custom">
            <div class="card">
               <div class="card-header">Всего просмотрено</div>
               <div class="card-body">
                  <Stats></Stats>
               </div>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col col-custom">
            <div class="card">
               <div class="card-header">Последние просмотренные</div>
               <List></List>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

import Add from '../components/Add.vue'
import Stats from '../components/Stats.vue'
import List from '../components/List.vue'

export default {
   name: 'Index',
   components: {
      'Add': Add,
      'Stats': Stats,
      'List': List,
   },
}


</script>

<style type="text/css">
   .container {
      margin-top: 2rem;
   }
   .col-custom {
      margin-bottom: 2rem;
   }
   .title{
      padding-bottom: 30px;
   }
</style>
