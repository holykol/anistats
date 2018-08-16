<template>
   <form action="">
      <div class="form-group">
         <label for="name">Title</label>
         <b-form-input
            type="text"
            v-model="title"
            :state="($v.title.$error) ? false : null"
            id="title"
            class="form-control"
            placeholder="Death Note" />
         <div class="invalid-feedback" v-if="!$v.title.required">This field is required</div>

      </div>
      <div class="form-group">
         <div class="row">
            <div class="col-8">
               <label for="url">URL</label>
               <b-form-input
                  type="text"
                  v-model="url"
                  :state="($v.url.$error) ? false : null"
                  id="url"
                  placeholder="https://example.com"/>
               <div class="invalid-feedback" v-if="!$v.url.url">Url must start with http(s)</div>

            </div>
            <div class="col-4">
               <label for="episodes">Episodes</label>
               <b-form-input
                  type="number"
                  v-model.number="episodes"
                  :state="($v.episodes.$error) ? false : null"
                  id="episodes"
                  min="0"
                  class="form-control"
                  placeholder="20"/>
               <div class="invalid-feedback" v-if="!$v.episodes.required">Must be greater that 0</div>
            </div>
         </div>
      </div>
      <div class="form-group m-0">
         <button id="submit" class="btn btn-primary mt-1 w-100" @click.prevent="submit">Add</button>
         <p v-if="error_submit" class="text-danger error m-0 mt-2">{{ error_submit }}</p>
      </div>
   </form>
</template>

<script>
   import smpr from '../simperium/simperium'
   import { required, minLength, minValue, url } from 'vuelidate/lib/validators'
   import { validationMixin } from 'vuelidate'

   export default {
      name: 'Add',
      data() {
         return {
            title: null,
            url: null,
            episodes: null,
            error_submit: null,
         }
      },
      validations: {
         title: {
            required,
            minLength: minLength(1),
         },

         episodes: {
            required,
            minValue: minValue(1),
         },
         url: {
            url: url,
         },
      },
      methods: {
         async submit(e) {
            try {
               this.$v.$touch()

               if (this.$v.$invalid) {
                  return
               }

               await smpr.add({
                  title: this.title,
                  url: this.url,
                  episodes: this.episodes,
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
               })


               this.title = null
               this.url = null
               this.episodes = null

               this.$v.$reset()

            }
            catch (e) {
               console.error(e)
               this.error_submit = e.message
            }
         },
      },
   }
</script>

<style scoped>

</style>
