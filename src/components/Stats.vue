<template>
   <div>
      <div class="row">
         <div class="col text-center">
            <p class="stat-text">Тайтлов:</p>
            <div id="watched-total" class="allocated">{{ titlesCount }}</div>
         </div>
         <div class="col text-center">
            <p class="stat-text">Эпизодов:</p>
            <div id="watched-episodes" class="allocated">{{ episodesCount }}</div>
         </div>
      </div>
   </div>
</template>

<script>
   import { mapGetters } from 'vuex'

   export default {
      name: "Stats",
      computed: {
         ...mapGetters(['titlesCount', 'episodesCount']),
      },
      methods: {
         log() {
            console.log(this.$store.state.titles.data)
         }
      }
   }
</script>

<style type="text/css">
   .allocated {
      text-align: center;
      width: 110px;
      line-height: 100px;
      border-radius: 100%;
      display: inline-block;
      vertical-align: top;
      font-size: 43px;
      color: var(--primary);
      border: 5px solid var(--primary);
   }
   .stat-text{
      font-size: 22px;
      margin-bottom: 10px;
   }
</style>