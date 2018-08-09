<template>
   <div>
      <table class="table table-hover" v-if="$store.state.data.length">
         <thead>
            <tr>
               <th>Название</th>
               <th>Эпизоды</th>
               <th>Действия</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="item in data">
               <td v-if="item.url"><a :href="item.url" target="_blank">{{item.title}}</a></td>
               <td v-else>{{item.title}}</td>
   
               <td>{{ item.episodes }}</td>
               <td>
                  <a href="#" @click="showEditModal" :data-id="item.id">
                     <span class="icon icon-edit"></span> Изменить
                  </a>
                  &nbsp &nbsp
                  <a href="#" @click="deleteItem" :data-id="item.id">
                     <span class="icon icon-delete"></span> Удалить
                  </a>
               </td>
            </tr>
         </tbody>
      </table>
      <div class="card-body text-muted" v-else>Тут ёще ничего нет...</div>
      <b-modal id="editModal" ref="editModal" title="Изменить">
         <form action="" ref="form">
            <div class="form-group">
               <label for="name">Название</label>
               <input 
                  type="text" 
                  ref="firstInput" 
                  v-model="editing.title" 
                  id="title" 
                  class="form-control" 
                  placeholder="Название аниме" 
                  required
               >
            </div>
            <div class="form-group">
               <div class="row">
                  <div class="col-8">
                     <label for="url">Ссылка</label>
                     <input type="text" v-model="editing.url" class="form-control" placeholder="https://example.com">
                  </div>
                  <div class="col-4">
                     <label for="episodes">Эпизоды</label>
                     <input type="number" v-model="editing.episodes"  class="form-control" min="1" step="1" placeholder="20" required>
                  </div>
               </div>
            </div>
         </form>
   
         <a slot="modal-cancel" @click="show=false">Отмена</a>
         <a slot="modal-ok" variant="primary" @click="saveItem">Сохранить</a>
      </b-modal>
   
      <b-modal id="deleteModal" ref="deleteModal" title="Удалить?">
         <b-form-input type="text" />
      </b-modal>
   </div>
</template>
<script>
   
   export default {
      name: "Stats",
      data() {
         return {
            editing: {
               id: null,
               title: null,
               url: null,
               episodes: 0,
            },
            deletingId: null,
         }
      },
      computed: {
         data() {
            return this.$store.getters.reversedItems
         }
      },
      methods: {
         deleteItem(e) {
            e.preventDefault()
            const id = e.target.dataset.id
            this.$store.dispatch('deleteItem', id)
         },
         showEditModal(e) {
            e.preventDefault()

            const obj = this.data.filter(function(el){
               return el.id === e.target.dataset.id
            })
            this.editing = Object.assign({}, obj[0])
            this.$refs.editModal.show()
            this.$refs.firstInput.focus()
         },
         saveItem(e) {
            e.preventDefault()
            this.$store.dispatch('updateItem', this.editing)
         }
      }
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