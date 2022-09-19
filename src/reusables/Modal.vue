<template>
	<b-modal :id="id" :visible="visible" :size="size" :no-close-on-backdrop="!closeOnBackdrop" :no-close-on-esc="!closeOnEsc" :scrollable="scrollable" :hide-footer="noFooter" :hide-header="noHeader" @ok="handleOk" @hidden="handleHidden">
		<template #modal-title>
			<slot v-if="$php.empty(title)" name="title" />
			<div v-else v-html="title"></div>
		</template>
		<template #modal-footer="{ok, close}">
			<slot name="footer" v-bind="slotScope">
				<b-button :size="buttonSize" v-if="!okOnly" :variant="cancelVariant" @click.prevent="close()">{{ titleCancel }}</b-button>
				<b-button :size="buttonSize" v-if="!cancelOnly" :variant="okVariant" @click.prevent="ok()" :disabled="submitted">{{ titleOk }} <b-spinner class="align-middle" small v-if="submitted"></b-spinner></b-button>
			</slot>
		</template>
		<slot />
	</b-modal>
</template>

<script>
export default {
	props: {
		id: {type: String, required: true},
		visible: {type: Boolean, default: false},
		title: {type: String},
		size: {type: String, default: 'md'},
		cancelVariant: {type: String, default: 'secondary'},
		cancelTitle: {type: String, default: null},
		okVariant: {type: String, default: 'blue'},
		okTitle: {type: String, default: null},
		buttonSize: {type: String, default: 'sm'},
		submitted: {type: Boolean, default: false},
		cancelOnly: {type: Boolean, default: false},
		okOnly: {type: Boolean, default: false},
		scrollable: {type: Boolean, default: false},
		noFooter: {type: Boolean, default: false},
		noHeader: {type: Boolean, default: false},
		closeOnBackdrop: {type: Boolean, default: false},
		closeOnEsc: {type: Boolean, default: false},
	},
	computed: {
		 slotScope() {
			return {
				close: () => this.$bvModal.hide(this.id),
			}
		},
	},
	data: () => ({
		titleCancel: null,
		titleOk: null,
	}),
	mounted() {
		this.retriveTitle()
	},
	updated() {
		this.retriveTitle()
	},
	methods: {
		handleHidden() {
			this.$emit('close')
		},
		handleOk(btvEvt) {
			this.$emit('ok', btvEvt)
		},
		retriveTitle() {
			this.titleCancel = JSON.parse(JSON.stringify(this.cancelTitle))
			if ($php.empty(this.titleCancel)) {
				this.titleCancel = this.$t(this.cancelOnly === true ? 'fermer' : 'annuler')
			}

			this.titleOk = JSON.parse(JSON.stringify(this.okTitle))
			if ($php.empty(this.titleOk)) {
				this.titleOk = this.$t('valider')
			}
		}
	}
}
</script>
