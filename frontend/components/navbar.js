export const NavBar = Vue.component("nav-bar", {
	template: `
		<nav class="navbar navbar-expand-lg button-color">
  			<div class="container-fluid row">
				<div class="col-7">

				</div>
				<div class="col-1">
					<router-link to="/predict" class="btn btn-light"> Scan </router-link>
				</div>
				<div class="col-1">
					<router-link to="/ask" class="btn btn-light"> Ask </router-link>
				</div>
				<div class="col-1">
					<button class="btn btn-light" @click="logout">Logout </button>
				</div>
				<div class="col-2">
					<a href="https://wa.me/+14155238886?text=join%20worse-usual" class="btn btn-light"> Enable Reminders </a>
				</div>
  			</div>
		</nav>
	`,

	methods: {
		logout(){
			localStorage.removeItem("authentication_token")
			this.$router.push("/login")
		}
	}
})
