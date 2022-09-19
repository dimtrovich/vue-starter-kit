<template>
	<v-select :disabled="disabled" :options="options" v-model="v_model" :reduce="reduce" :label="label">
		<slot name="option" />
		<template #no-options="{ search, searching }">
			<span v-if="searching">{{ $t('aucun_resultat_trouver_pour') }} <b>{{ search }}</b></span>
			<span v-else>{{ emptyResult }}</span>
		</template>
	</v-select>
</template>

<script>
import i18n from '@/plugins/i18n';

export default {
	props: {
		disabled: {type: Boolean, default: false},
		options: {type: Array, required: true},
		reduce: {type: Function},
		label: {type: String},
		value: {type: [String, Array]},
		emptyResult: {type: String, default: i18n.t('aucun_resultat')},
	},
	data: () => ({
		v_model: null
	}),
	mounted() {
        if (!$php.empty(this.value)) {
			this.current = this.value
		}
    },
}
</script>
