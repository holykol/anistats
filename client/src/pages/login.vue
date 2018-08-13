<template>
	<div class="wrap">
		<form action="" class="form" @submit="submit">
			<h3 class="pb-3">Вход / <router-link to="/register">Регистрация</router-link></h3>
			<div class="form-group">
				<input type="email" v-model="username" class="form-control" placeholder="Email">
			</div>
			<div class="form-group">
				<input type="password" v-model="password" class="form-control" placeholder="Пароль">
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-primary w-100" :disabled="working">Войти</button>
				<p class="text-danger error pt-2" v-if="error">{{error}}</p>
			</div>
			<div class="form-group">
				<p class="text-muted">Твои данные обрабатываются <a href="https://simperium.com">Simperium</a></p>
			</div>
		</form>
	</div>
</template>

<script>
	import { login } from '../actions/account'

	export default {
		name: "Login",
		data() {
			return {
				username: null,
				password: null,
				error: null,
				working: false,
			}
		},
		methods: {
			async submit(e) {
				e.preventDefault()
				try {
					this.error = null
					this.working = true

					const res = await login(this.username, this.password)
					this.$store.commit('login', res.data)

					this.$router.push('/')
				}
				catch(e) {
					this.error = (e.response.data) ? e.response.data.error : 'Страшная ошибка'
					this.working = false
				}
			}
		}

	}
</script>

<style type="text/css" scoped>
	.wrap {
		display: flex;
		justify-content: center;
		padding-top: 40px;
    	padding-bottom: 40px;
    	align-items: center;
	}
	.form {
		width: 100%;
		max-width: 290px;
		margin: 0 auto;
	}
	.text-muted, .error {
		font-size: 80%;
	}

</style>