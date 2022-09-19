<template>
	<b-overlay :show="value" :rounded="rounded" :opacity="opacity" :style="'min-height:'+height">
		<template #overlay><div class="text-center mt-5">
			<b-icon :icon="icon" :animation="animation" :font-scale="scale"></b-icon>
			<p>{{ message }}</p>
		</div></template>
		<div v-if="!value">
			<slot />		
		</div>
	</b-overlay>
</template>

<script>
import i18n from '@/plugins/i18n';

export default {
  	props: {
    	value: {type: Boolean, required: true},
		message: {type: String, default: i18n.t('chargement')},
		icon: {type: String, default: 'three-dots'},
		animation: {type: String, default: 'throb'},
		scale: {type: [Number, String], default: '4'},
		rounded: {type: String, default: 'sm'},
		opacity: {type: Number, default: 0},
		height: {type: String, default: '5em'},
  	}
}
</script>
