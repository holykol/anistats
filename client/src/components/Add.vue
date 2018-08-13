<template>
	<form action="">
		<div class="form-group">
			<label for="name">Название</label>
			<input type="text" v-model="title" id="title" class="form-control" placeholder="Название аниме" required>
		</div>
		<div class="form-group">
			<div class="row">
				<div class="col-8">
				  	<label for="url">Ссылка</label>
				  	<input type="text" v-model="url" id="url" class="form-control" placeholder="https://example.com">
				</div>
				<div class="col-4">
			  		<label for="episodes">Эпизоды</label>
					<input type="number" v-model="episodes" id="episodes" class="form-control" min="1" step="1" placeholder="20" required>
				</div>
			</div>
		</div>
		<div class="form-group m-0">
			<button id="submit" class="btn btn-primary mt-1 w-100" @click="submit">Добавить</button>
			<p v-if="error" class="text-danger error m-0 mt-2">{{ error }}</p>
		</div>
 	</form>
</template>

<script>
	import smpr from '../simperium/simperium' 

	export default {
		name: "Add",
		data() {
			return {
				title: null,
				url: null,
				episodes: null,
				error: null,
			}
		},
		methods: {
			async submit(e) {
				e.preventDefault()
				
				try {
					if (!this.title || this.episodes < 1) {
						this.error = "Заполни все поля!"
						setTimeout(() => {
							this.error = null
						}, 2000)
						return
					}

					await smpr.add({
						title: this.title,
						url: this.url,
						episodes: this.episodes,
					})


					this.title = null
					this.url = null
					this.episodes = null
					this.error = null
				}
				catch(e) {
					this.error = e.message
				}
			}
		}
	}
</script>

<style scoped>
	
</style>