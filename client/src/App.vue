<template>
	<div id="app">
		<nav class="navbar navbar-light bg-light">
  			<a class="navbar-brand" href="#"><b>AniStats</b></a>
		</nav>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import 'bootstrap/dist/css/bootstrap.css'
	
	import Add from './components/Add.vue'
	import Stats from './components/Stats.vue'
	import List from './components/List.vue'

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
	
</style>