<template>
	<b-alert variant="info" show class="text-center">
		<i class="fa fa-exclamation-triangle fa-3x"></i> <br>
		<span class="h4 d-inline-block mt-1 w-100">{{ message }}</span>
	</b-alert> 
</template>

<script>
export default {
	props: {
		message: {type: String, required: true}
	}
}
</script>
