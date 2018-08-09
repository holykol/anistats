<template>
   <div>
      <div class="row">
         <div class="col text-center">
            <p class="stat-text">Тайтлов:</p>
            <div id="watched-total" class="allocated">{{ $store.state.data.length || 0}}</div>
         </div>
         <div class="col text-center">
            <p class="stat-text">Эпизодов:</p>
            <div id="watched-episodes" class="allocated">{{ episodesCount }}</div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: "Stats",
      computed: {
         episodesCount() {
            return this.$store.getters.episodesCount || 0
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
      color: var(--blue);
      border: 5px solid var(--blue);
   }
   .stat-text{
      font-size: 22px;
      margin-bottom: 10px;
   }
</style>