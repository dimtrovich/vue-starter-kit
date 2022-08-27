<template>
  	<div>
		<sidebar />
		<navbar />
		<div class="main">
			<slot />
		</div>
	</div>
</template>

<script>
import Navbar from './partials/Navbar.vue'
import Sidebar from './partials/Sidebar.vue'
export default {
  components: { Sidebar, Navbar },
	
}
</script>
