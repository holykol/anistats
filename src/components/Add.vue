<template>
   <form action="">
      <div class="form-group">
         <label for="name">Title</label>
         <b-form-input type="text" v-model="obj.title" id="title" :state="error_title" class="form-control" placeholder="Death Note"/>
         <b-form-invalid-feedback>
           This is a required field
         </b-form-invalid-feedback>
      </div>
      <div class="form-group">
         <div class="row">
            <div class="col-8">
               <label for="url">URL</label>
               <b-form-input type="text" v-model="obj.url" id="url" placeholder="https://example.com"/>
            </div>
            <div class="col-4">
               <label for="episodes">Episodes</label>
               <b-form-input type="number" v-model="obj.episodes" id="episodes" :state="this.error_episodes" min="0" class="form-control" placeholder="20"/>
            </div>
         </div>
      </div>
      <div class="form-group m-0">
         <button id="submit" class="btn btn-primary mt-1 w-100" @click="submit">Add</button>
         <p v-if="error_submit" class="text-danger error m-0 mt-2">{{ error_submit }}</p>
      </div>
   </form>
</template>

<script>
   import smpr from '../simperium/simperium'

   export default {
      name: 'Add',
      data() {
         return {
            count: 0,
            error_title: null,
            error_episodes: null,
            error_submit: null,
            obj: {
               title: '',
               url: '',
               episodes: 0,
            },
         }
      },
      watch: {
         'obj.title': function(value) {
            if (value.length > 0) {
               this.error_title = null
            }
         },

         'obj.episodes': function(value) {
            if (Number(value) > 0) {
               this.error_episodes = null
            }
         },
      },
      methods: {
         async submit(e) {
            e.preventDefault()
            try {
               console.log('Submit')
               if(!this.obj.title.length > 0) {
                  this.error_title = false
               }

               if(Number(this.obj.episodes) < 1) {
                  this.error_episodes = false
               }


               if (this.error_title === false || this.error_episodes === false) {
                  return
               }

               await smpr.add({
                  title: this.obj.title,
                  url: this.obj.url,
                  episodes: Number(this.obj.episodes),
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
               })


               this.obj = {
                  title: '',
                  url: '',
                  episodes: 0,
               }

               this.error_title = null
               this.error_episodes = null
               this.error_submit = null

            } catch (e) {
               console.error(e)
               this.error_submit = e.message
            }
         },
      },
   }
</script>

<style scoped>

</style>
