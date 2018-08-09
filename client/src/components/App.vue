<template>
	<div id="app">
		<nav class="navbar navbar-light bg-light">
  			<a class="navbar-brand" href="#"><b>AniStats</b></a>
		</nav>
		<div class="container">
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
		
	</div>
</template>

<script>
	import axios from 'axios'
	import 'bootstrap/dist/css/bootstrap.css'
	
	import Add from './Add.vue'
	import Stats from './Stats.vue'
	import List from './List.vue'

	export default {
		name: "App",
		components: {
    		'Add': Add,
    		'Stats': Stats,
    		'List': List,
		},
		created() {
			axios.get('http://localhost:8081')
				.then((res) => {
					this.$store.commit('init', res.data.reverse())
				})
				.catch((err) => {
					console.error(err)
				})
		}
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