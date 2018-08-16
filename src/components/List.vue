<template>
   <div class="table-responsive">
      <table class="table table-hover mb-0" v-if="titlesCount">
         <thead>
            <tr>
               <th>Title</th>
               <th>Episodes</th>
               <th>Actions</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(item, id) in $store.getters.sortedItems" :key="id">
               <td v-if="item.url"><a :href="item.url" target="_blank">{{item.title}}</a></td>
               <td v-else>{{item.title}}</td>

               <td>{{ item.episodes }}</td>
               <td style="white-space: nowrap">
                  <a href="#" @click.prevent="showEditModal(id)" :data-id="id">
                     <span class="icon icon-edit"/> Edit
                  </a>
                  &nbsp; &nbsp;
                  <a href="#" @click.prevent="deleteItem(id)" :data-id="id">
                     <span class="icon icon-delete"/> Delete
                  </a>
               </td>
            </tr>
         </tbody>
      </table>
      <div class="card-body text-muted" v-else>There is nothing here...</div>


      <b-modal
         id="editModal"
         ref="editModal"
         title="Edit"
         @ok.prevent="saveItem"
         ok-title="Save"
         cancel-title="Cancel">

         <form action="" ref="form">
            <div class="form-group">
               <label for="name">Title</label>
               <b-form-input 
                  type="text"
                  v-model="editing.title"
                  :state="($v.editing.title.$error) ? false : null"
                  id="title"
                  class="form-control"
                  placeholder="Death Note" />
               <div class="invalid-feedback" v-if="!$v.editing.title.required">This field is required</div>

            </div>
            <div class="form-group">
               <div class="row">
                  <div class="col-8">
                     <label for="url">URL</label>
                     <b-form-input 
                        type="text" 
                        v-model="editing.url" 
                        :state="($v.editing.episodes.$error) ? false : null" 
                        id="url" 
                        placeholder="https://example.com"/>
                     <div class="invalid-feedback" v-if="!$v.editing.episodes.url">Url must start with http(s)</div>

                  </div>
                  <div class="col-4">
                     <label for="episodes">Episodes</label>
                     <b-form-input
                        type="number"
                        v-model.number="editing.episodes"
                        :state="($v.editing.url.$error) ? false : null"
                        id="episodes"
                        min="1"
                        class="form-control"
                        placeholder="20"/>
                     <div class="invalid-feedback" v-if="!$v.editing.url.required">Must be greater that 0</div>
                  </div>
               </div>
            </div>
         </form>
      </b-modal>
   </div>
</template>

<script>
   import smpr from '../simperium/simperium'
   import { required, numeric, minLength, minValue, url } from 'vuelidate/lib/validators'
   import { mapGetters } from 'vuex'

   export default {
      name: 'List',
      data() {
         return {
            editing: {
               id: null,
               title: null,
               url: null,
               episodes: null,
               createdAt: null,
               updatedAt: null,
            },
         }
      },
      computed: {
         ...mapGetters(['titlesCount']),
      },
      validations: {
         editing: {
            title: {
               required,
            },

            episodes: {
               required,
               minValue: minValue(1)
            },
            url: {
               url,
            },
         }
         
      },
      methods: {
         deleteItem(id) {
            try {
               smpr.remove(id)
            } catch (e) {
               console.log(e)
            }
         },
         showEditModal(id) {
            const obj = this.$store.state.titles.data[id]

            this.editing = Object.assign({}, obj)

            this.editing.id = id

            this.$v.$reset()
            this.$refs.editModal.show()
         },
         saveItem(e) {
            try {
               this.$v.$touch()
               
               if (this.$v.$invalid) {
                  return
               }

               this.editing.updatedAt = Date.now()
               
               const id = this.editing.id

               smpr.update(id, this.editing)
               this.$refs.editModal.hide()
            }
            catch(e) {
               console.error(e)
            }
         },
      },
   }
</script>

<style type="text/css">
   @font-face {
      font-family: 'icon';
      src:  url('../../static/fonts/icon.eot?b36xa6');
      src:  url('../../static/fonts/icon.eot?b36xa6#iefix') format('embedded-opentype'),
         url('../../static/fonts/icon.ttf?b36xa6') format('truetype'),
         url('../../static/fonts/icon.woff?b36xa6') format('woff'),
         url('../../static/fonts/icon.svg?b36xa6#icon') format('svg');
      font-weight: normal;
      font-style: normal;
   }

   .table th {
      padding: 0.6rem 1.25rem;
      border-bottom: none;
   }

   .table td {
      padding: 0.4rem 1.25rem;
   }

   .icon {
      font-family: 'icon' !important;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;

      /* Better Font Rendering =========== */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
   }


   .icon-delete:before {
      content: "\e900";
   }
   .icon-edit:before {
      content: "\e901";
   }
</style>
